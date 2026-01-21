<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\SavedLinkController;
use App\Http\Controllers\SavedObjectPropController;

Route::get('/', [HomeController::class, 'index'])
    ->middleware(['auth', 'verified'])
    ->name('home');

Route::post('/saved-links', [SavedLinkController::class, 'add'])
    ->middleware(['auth', 'verified'])
    ->name('saved-links.add');

Route::get('/download-saved-object/{savedObjectPropId}', [SavedObjectPropController::class, 'download'])
    ->middleware(['auth', 'verified'])
    ->name('download.saved_object');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::redirect('/dashboard', '/');
});



require __DIR__ . '/settings.php';
