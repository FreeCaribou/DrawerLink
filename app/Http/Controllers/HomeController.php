<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\SavedLink;
use Illuminate\Support\Facades\Auth;

class HomeController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $savedLinks = SavedLink::with('savedObjectProps')->where('user_id', $user->id)->get();

        return Inertia::render('welcome', [
            'savedLinks' => $savedLinks,
        ]);
    }
}
