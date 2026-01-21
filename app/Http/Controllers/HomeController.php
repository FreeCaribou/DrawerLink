<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\SavedLink;
use Illuminate\Support\Facades\Auth;

class HomeController extends Controller
{
    public function index()
    {
        $savedLinks = SavedLink::with('savedObjectProps')->get();

        // TODO to retrieve the user later
        $user = Auth::user();
        $user->getAttributeValue("id");

        return Inertia::render('welcome', [
            'savedLinks' => $savedLinks,
        ]);
    }
}
