<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\SavedLink;

use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class SavedLinkController extends Controller
{
    public function add(Request $request)
    {
        $request->validate([
            'label' => 'required|string',
            'description' => 'string'
        ]);
        // TODO return err message

        DB::transaction(function () use ($request) {
            $user = Auth::user();
            $savedLink = SavedLink::create([
                'label' => $request->label,
                'description' => $request->description,
                'user_id' => $user->id
            ]);

            $uploadedFile = $request->file('file');
            if ($uploadedFile) {
                $savedObjectProp = $savedLink->savedObjectProps()->create([
                    'name' => $uploadedFile->getClientOriginalName(),
                    'mime_type' => $uploadedFile->getClientMimeType(),
                ]);

                $savedObjectProp->savedObject()->create([
                    'content' => base64_encode(file_get_contents($uploadedFile->getRealPath()))
                ]);
            }

            Log::info('Creation of a link');
        });

        return redirect()->back()->with('success', 'Saved link add !');
    }
}
