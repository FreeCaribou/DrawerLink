<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\SavedLink;
use App\Models\Tag;

use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class SavedLinkController extends Controller
{
    public function add(Request $request)
    {
        $validated = $request->validate([
            'label' => 'required|string|max:255',
            'description' => 'nullable|string|max:2000',
            'draw_id' => 'required',
            'tags' => 'nullable|string'
        ]);
        // TODO return err message
        // Verify that the draw belong to the user

        DB::transaction(function () use ($request) {
            Log::info('Trying creation of a link');
            // Base creation
            $user = Auth::user();
            $savedLink = SavedLink::create([
                'label' => $request->label,
                'description' => $request->description,
                'user_id' => $user->id,
                'draw_id' => $request->draw_id,
            ]);

            // Link some tags if present
            // We separate the string with the "," and then we upper case the first letter
            if (!empty(trim($request->tags))) {
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
                    'content' => base64_encode(file_get_contents($uploadedFile->getRealPath()))
                ]);
            }

            Log::info('Creation of a link');
        });

        return redirect()->back()->with('success', 'Saved link added!');
    }
}
