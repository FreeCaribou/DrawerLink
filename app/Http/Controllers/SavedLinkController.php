<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\SavedLink;

use Illuminate\Support\Facades\Log;

class SavedLinkController extends Controller
{
    public function add(Request $request)
    {
        Log::info('Creation of a link');
        $request->validate([
            'label' => 'required|string',
        ]);
        // TODO return message erreur

        $uploadedFile = $request->file('file');
        if ($uploadedFile) {
            $content = base64_encode(file_get_contents($uploadedFile->getRealPath()));
            // Log::info('Creation of a link v2 doc info ' . $uploadedFile->getClientOriginalName() . ' ' . $uploadedFile->getClientMimeType());
        }

        SavedLink::create([
            'label' => $request->label,
        ]);

        return redirect()->back()->with('success', 'Saved link add !');
    }
}
