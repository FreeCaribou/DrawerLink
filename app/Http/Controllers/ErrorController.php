<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class ErrorController extends Controller
{
    public function manageError()
    {
        return Inertia::render('error-page', [
            'error' => 'Unauthorized',
        ]);
    }
}
