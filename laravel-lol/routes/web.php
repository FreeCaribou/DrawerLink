<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\SavedLinkController;

Route::get('/', [HomeController::class, 'index'])
    ->middleware(['auth', 'verified'])
    ->name('home');

Route::post('/saved-links', [SavedLinkController::class, 'add'])
    ->middleware(['auth', 'verified'])
    ->name('saved-links.add');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::redirect('/dashboard', '/');
});

require __DIR__ . '/settings.php';
