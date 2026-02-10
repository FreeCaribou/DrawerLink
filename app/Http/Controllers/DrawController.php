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
            'label' => 'required|string|max:255',
            'description' => 'nullable|string|max:2000',
        ]);
        // TODO return err message if not valid

        $user = Auth::user();
        Draw::create([
            'label' => $request->label,
            'description' => $request->description,
            'user_id' => $user->id,
        ]);

        Log::info('Creation of draw');

        return redirect()->back()->with('success', 'Draw added!');
    }

    public function dataDrawDetails(int $drawId)
    {
        $userId = Auth::user()->id;
        $drawDetails = Draw::with('savedLinks')->with('savedLinks.savedObjectProps')->with('savedLinks.tags')->find($drawId);
        if ($userId != $drawDetails->user_id) {
            return response()->json(['error' => 'Unauthorized', 'messages' => ['error.not-your-draw']], 403);
        }
        return response()->json($drawDetails);
    }
}
