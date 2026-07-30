<?php

namespace App\Http\Controllers;

use App\Models\Draw;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        $drawBaseList = Draw::where('user_id', Auth::id())->withCount('savedLinks')->get();

        return Inertia::render('welcome-page', [
            'drawBaseList' => $drawBaseList,
        ]);
    }
}
