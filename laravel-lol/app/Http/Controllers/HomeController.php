<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\SavedLink;
use Laravel\Fortify\Features;

class HomeController extends Controller
{
    public function index()
    {
        $savedLinks = SavedLink::all();

        return Inertia::render('welcome', [
            'savedLinks' => $savedLinks,
            'canRegister' => Features::enabled(Features::registration()),
        ]);
    }
}
