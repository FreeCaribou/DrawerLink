<?php

namespace App\Http\Controllers;

use App\Models\Draw;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $drawBaseList = Draw::where('user_id', $user->id)->withCount('savedLinks')->get();

        return Inertia::render('welcome', [
            'drawBaseList' => $drawBaseList,
        ]);
    }
}
