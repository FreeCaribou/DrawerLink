<?php

namespace App\Http\Controllers;

use App\Models\SavedObjectProp;
use App\Models\SavedLink;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class SavedObjectPropController extends Controller
{
    public function download(int $savedObjectPropId)
    {
        $userId = Auth::user()->id;
        $savedObjectProp = SavedObjectProp::with('savedObject')->with('savedLink')->find($savedObjectPropId);
        if ($userId != $savedObjectProp->savedLink->user_id) {
            return redirect()->route('error')->withErrors(['error.not-your-document']);
        }
        $fileContent = base64_decode($savedObjectProp->savedObject->content);

        return Response::make($fileContent, 200, [
            'Content-Type' => $savedObjectProp->mime_type,
            'Content-Disposition' => 'attachment; filename="' . $savedObjectProp->name . '"',
            'Content-Length' => strlen($fileContent),
        ]);
    }

    public function downloadShared(int $savedObjectPropId, string $sharedKey)
    {
        $savedObjectProp = SavedObjectProp::with('savedObject')->with('savedLink')->find($savedObjectPropId);
        if ($sharedKey != $savedObjectProp->savedLink->shared_key) {
            return redirect()->route('error')->withErrors(['error.not-your-document']);
        }
        $fileContent = base64_decode($savedObjectProp->savedObject->content);

        return Response::make($fileContent, 200, [
            'Content-Type' => $savedObjectProp->mime_type,
            'Content-Disposition' => 'attachment; filename="' . $savedObjectProp->name . '"',
            'Content-Length' => strlen($fileContent),
        ]);
    }

    public function delete(int $savedObjectPropId)
    {
        $userId = Auth::user()->id;
        $savedObjectProp = SavedObjectProp::with('savedObject')->with('savedLink')->find($savedObjectPropId);
        if ($userId != $savedObjectProp->savedLink->user_id) {
            return redirect()->route('error')->withErrors(['error.not-your-document']);
        }
        Log::info('Delete a saved object prop ' . $savedObjectPropId);
        $savedObjectProp->delete();
    }

    public function add(int $savedLinkId, Request $request)
    {
        $savedLink = SavedLink::find($savedLinkId);
        $userId = Auth::user()->id;
        if ($userId != $savedLink->user_id) {
            return redirect()->route('error')->withErrors(['error.not-your-link']);
        }

        Log::info('Trying add a new saved object prop to the link ' . $savedLinkId);
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

        return redirect()->back()->with('success', 'Saved link added!');
    }
}
