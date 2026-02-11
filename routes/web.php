<?php

use App\Http\Controllers\DrawController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\SavedLinkController;
use App\Http\Controllers\SavedObjectPropController;
use Illuminate\Support\Facades\Route;

Route::get('/', [HomeController::class, 'index'])
    ->middleware(['auth', 'verified'])
    ->name('home');

Route::post('/saved-links', [SavedLinkController::class, 'add'])
    ->middleware(['auth', 'verified'])
    ->name('saved-links.add');

Route::delete('/saved-links/{savedLinkId}', [SavedLinkController::class, 'deleteOne'])
    ->middleware(['auth', 'verified'])
    ->name('saved-links.delete');

Route::get('/saved-links/{savedLinkId}', [SavedLinkController::class, 'getOne'])
    ->middleware(['auth', 'verified'])
    ->name('saved-links.get-one');

Route::post('/draws', [DrawController::class, 'add'])
    ->middleware(['auth', 'verified'])
    ->name('draws.add');

Route::get('/data/draws/{drawId}', [DrawController::class, 'dataDrawDetails'])
    ->middleware(['auth', 'verified'])
    ->name('draws.data-draw-details');

Route::get('/download-saved-object/{savedObjectPropId}', [SavedObjectPropController::class, 'download'])
    ->middleware(['auth', 'verified'])
    ->name('download.saved_object');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::redirect('/dashboard', '/');
});

require __DIR__ . '/settings.php';
