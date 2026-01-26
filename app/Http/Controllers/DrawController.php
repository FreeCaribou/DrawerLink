<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Draw;
use Illuminate\Support\Facades\Log;

use Illuminate\Support\Facades\Auth;

class DrawController extends Controller
{
    public function add(Request $request)
    {
        $request->validate([
            'label' => 'required|string',
            'description' => 'nullable|string',
        ]);
        // TODO return err message

        $user = Auth::user();
        Draw::create([
            'label' => $request->label,
            'description' => $request->description,
            'user_id' => $user->id,
        ]);

        Log::info('Creation of draw');

        return redirect()->back()->with('success', 'Draw added!');
    }
}
