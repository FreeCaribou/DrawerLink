<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\SavedLink;

use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;

class SavedLinkController extends Controller
{
    public function add(Request $request)
    {
        Log::info('Creation of a link');
        $request->validate([
            'label' => 'required|string',
        ]);
        // TODO return err message

        DB::transaction(function () use ($request) {
            $savedLink = SavedLink::create([
                'label' => $request->label,
            ]);

            $uploadedFile = $request->file('file');
            if ($uploadedFile) {
                $savedLink->savedObjectProps()->create([
                    'name' => $uploadedFile->getClientOriginalName(),
                    'mime_type' => $uploadedFile->getClientMimeType(),
                ]);
            }
        });

        return redirect()->back()->with('success', 'Saved link add !');
    }
}
