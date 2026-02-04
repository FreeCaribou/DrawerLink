<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Draw;
use Illuminate\Support\Facades\Auth;

class HomeController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $drawBaseList = Draw::where('user_id', $user->id)->withCount('savedLinks')->get();

        return Inertia::render('welcome', [
            'drawBaseList' => $drawBaseList
        ]);
    }
}
