<?php

namespace App\Http\Controllers;

use App\Models\SavedObjectProp;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class SavedObjectPropController extends Controller
{
    public function download(int $savedObjectPropId)
    {
        $userId = Auth::user()->id;
        $savedObjectProp = SavedObjectProp::with('savedObject')->with('savedLink')->find($savedObjectPropId);
        $fileContent = base64_decode($savedObjectProp->savedObject->content);
        if ($userId != $savedObjectProp->savedLink->user_id) {
            return Inertia::render('error-page', [
                'error' => 'Unauthorized',
                'messages' => ['error.not-your-document']
            ]);
        }

        return Response::make($fileContent, 200, [
            'Content-Type' => $savedObjectProp->mime_type,
            'Content-Disposition' => 'attachment; filename="' . $savedObjectProp->name . '"',
            'Content-Length' => strlen($fileContent),
        ]);
    }
}
