<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\SavedLink;

class SavedLinkController extends Controller
{
    public function add(Request $request)
    {
        $request->validate([
            'label' => 'required|string',
        ]);
        // TODO return message erreur

        SavedLink::create([
            'label' => $request->label,
        ]);

        return redirect()->back()->with('success', 'Saved link add !');
    }
}
