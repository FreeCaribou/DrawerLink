<?php

namespace App\Http\Controllers;

use App\Models\Draw;
use App\Models\SavedLink;
use App\Models\Tag;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Database\Eloquent\Builder;
use Inertia\Inertia;

class SavedLinkController extends Controller
{
    public function add(Request $request)
    {
        $request->validate([
            'label' => 'required|string|max:255',
            'description' => 'nullable|string|max:2000',
            'draw_id' => 'required',
            'tags' => 'nullable|string',
            'source_date' => 'nullable',
            'full_source' => 'nullable|string|max:255',
        ]);
        // TODO return err message if not valid

        $userId = Auth::user()->id;
        $draw = Draw::find($request->draw_id);
        if ($userId != $draw->user_id) {
            return redirect()->route('error')->withErrors(['error.not-your-draw']);
        }

        DB::transaction(function () use ($request, $userId) {
            Log::info('Trying creation of a link');
            $baseSource = null;
            if (!empty($request->full_source)) {
                try {
                    $parsedUrl = parse_url($request->full_source);
                    // I assume that if a website is called hellowww.net it will not be taken in consideration
                    $baseSource = str_replace('www.', '', $parsedUrl['host']) ?? null;
                } catch (\Exception $e) {
                    // Do nothing
                }
            }
            // Base creation
            $savedLink = SavedLink::create([
                'label' => $request->label,
                'description' => $request->description,
                'user_id' => $userId,
                'draw_id' => $request->draw_id,
                // For the search function or this kind of thing, it's better to assume that if the user don't put source date, it's now
                'source_date' => $request->source_date ?? now()->format('Y-m-d'),
                'full_source' => $request->full_source,
                'base_source' => $baseSource,
            ]);

            // Link some tags if present
            // We separate the string with the "," and then we upper case the first letter
            if (! empty(trim($request->tags))) {
                $tagLabels = array_map(function ($item) {
                    return ucfirst(strtolower(trim($item)));
                }, explode(',', $request->tags));
                $tags = [];
                foreach ($tagLabels as $label) {
                    $tag = Tag::firstOrCreate(['label' => $label]);
                    $tags[] = $tag->id;
                }
                $savedLink->tags()->attach($tags);
            }

            // Link the file if present
            $uploadedFile = $request->file('file');
            if ($uploadedFile) {
                $savedObjectProp = $savedLink->savedObjectProps()->create([
                    'name' => $uploadedFile->getClientOriginalName(),
                    'mime_type' => $uploadedFile->getClientMimeType(),
                    'size' => $uploadedFile->getSize(),
                ]);

                $savedObjectProp->savedObject()->create([
                    'content' => base64_encode(file_get_contents($uploadedFile->getRealPath())),
                ]);
            }

            Log::info('Creation of a link');
        });

        return redirect()->back()->with('success', 'Saved link added!');
    }

    public function getOne(int $savedLinkId)
    {
        $userId = Auth::user()->id;
        $savedLink = SavedLink::with('savedObjectProps')->with('tags')->with('draw')->find($savedLinkId);
        if ($userId != $savedLink->user_id) {
            return redirect()->route('error')->withErrors(['error.not-your-link']);
        }

        return Inertia::render('saved-link-detail-page', [
            'savedLink' => $savedLink,
        ]);
    }

    public function deleteOne(int $savedLinkId)
    {
        $userId = Auth::user()->id;
        $savedLink = SavedLink::find($savedLinkId);
        if ($userId != $savedLink->user_id) {
            return redirect()->route('error')->withErrors(['error.not-your-link']);
        }

        // TODO if the tags don't belong to other saved links, just delete it
        $savedLink->delete();

        return redirect()->route('home')->with('success', 'Saved link deleted!');
    }

    public function dataSearch(Request $request)
    {
        $userId = Auth::user()->id;

        $text = trim($request->get('text'));
        $draws = $request->get('draws', []);
        $tags = $request->get('tags', []);

        $savedLinks = SavedLink::where('user_id', $userId)
            ->when($text, function (Builder $query, string $text) {
                $query->where(function (Builder $q) use ($text) {
                    $q->whereRaw('LOWER(label) LIKE ?', ['%' . strtolower($text) . '%'])
                        ->orWhereRaw('LOWER(description) LIKE ?', ['%' . strtolower($text) . '%']);
                });
            })
            ->when(!empty($tags), function (Builder $query) use ($tags) {
                $query->whereHas('tags', function (Builder $q) use ($tags) {
                    $q->whereIn('tags.id', $tags);
                });
            })
            ->when(!empty($draws), function (Builder $query) use ($draws) {
                $query->whereIn('draw_id', $draws);
            })
            ->with('draw')->with('tags')->with('savedObjectProps')->get();

        return response()->json($savedLinks);
    }

    public function dataSearchFilterElement()
    {
        $userId = Auth::user()->id;

        $draws = Draw::where('user_id', $userId)->get();
        $tags = Tag::whereHas('savedLinks', function (Builder $query) use ($userId) {
            $query->where('user_id', $userId);
        })->get();

        return response()->json(['draws' => $draws, 'tags' => $tags]);
    }
}
