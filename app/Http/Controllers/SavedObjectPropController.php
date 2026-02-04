<?php

namespace App\Http\Controllers;

use App\Models\SavedObjectProp;
use Illuminate\Support\Facades\Response;

class SavedObjectPropController extends Controller
{
    public function download(int $savedObjectPropId)
    {
        // TODO verify that it's really linked to the current user
        $savedObjectProp = SavedObjectProp::with('savedObject')->find($savedObjectPropId);
        $fileContent = base64_decode($savedObjectProp->savedObject->content);

        return Response::make($fileContent, 200, [
            'Content-Type' => $savedObjectProp->mime_type,
            'Content-Disposition' => 'attachment; filename="' . $savedObjectProp->name . '"',
            'Content-Length' => strlen($fileContent),
        ]);
    }
}
