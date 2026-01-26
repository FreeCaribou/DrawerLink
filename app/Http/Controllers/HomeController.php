<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\SavedLink;
use App\Models\Draw;
use Illuminate\Support\Facades\Auth;

class HomeController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $savedLinks = SavedLink::with('savedObjectProps')->with('draw')->where('user_id', $user->id)->get();
        $drawBaseList = Draw::get();

        return Inertia::render('welcome', [
            'savedLinks' => $savedLinks,
            'drawBaseList' => $drawBaseList
        ]);
    }
}
