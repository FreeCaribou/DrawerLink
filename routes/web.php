<?php

use App\Http\Controllers\ArgumentController;
use App\Http\Controllers\DrawController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ErrorController;
use App\Http\Controllers\SavedLinkController;
use App\Http\Controllers\SavedObjectPropController;
use Illuminate\Support\Facades\Route;

Route::get('/error', [ErrorController::class, 'manageError'])
    ->name('error');

Route::get('/', [HomeController::class, 'index'])
    ->middleware(['auth', 'verified'])
    ->name('home');

Route::post('/saved-links', [SavedLinkController::class, 'add'])
    ->middleware(['auth', 'verified'])
    ->name('saved-links.add');

Route::put('/saved-links/{savedLinkId}', [SavedLinkController::class, 'update'])
    ->middleware(['auth', 'verified'])
    ->name('saved-links.update');

Route::delete('/saved-links/{savedLinkId}', [SavedLinkController::class, 'deleteOne'])
    ->middleware(['auth', 'verified'])
    ->name('saved-links.delete');

Route::delete('/saved-links/{savedLinkId}/shared-key', [SavedLinkController::class, 'deleteSharedKey'])
    ->middleware(['auth', 'verified'])
    ->name('saved-links.delete-shared-key');

Route::patch('/saved-links/{savedLinkId}/shared-key', [SavedLinkController::class, 'createSharedKey'])
    ->middleware(['auth', 'verified'])
    ->name('saved-links.create-shared-key');

Route::get('/data/saved-links', [SavedLinkController::class, 'dataSearch'])
    ->middleware(['auth', 'verified'])
    ->name('saved-links.data-search');

Route::get('/data/search-filter-element', [SavedLinkController::class, 'dataSearchFilterElement'])
    ->middleware(['auth', 'verified'])
    ->name('saved-links.data-search-filter-element');

Route::get('/saved-links/{savedLinkId}', [SavedLinkController::class, 'getOne'])
    ->middleware(['auth', 'verified'])
    ->name('saved-links.get-one');

Route::get('/data/saved-links', [SavedLinkController::class, 'dataGetAll'])
    ->middleware(['auth', 'verified'])
    ->name('saved-links.data-get-all');

Route::post('/draws', [DrawController::class, 'add'])
    ->middleware(['auth', 'verified'])
    ->name('draws.add');

Route::get('/data/draws/{drawId}', [DrawController::class, 'dataDrawDetails'])
    ->middleware(['auth', 'verified'])
    ->name('draws.data-draw-details');

Route::get('/download-saved-object/{savedObjectPropId}', [SavedObjectPropController::class, 'download'])
    ->middleware(['auth', 'verified'])
    ->name('saved_object.download');

Route::delete('/saved-object/{savedObjectPropId}', [SavedObjectPropController::class, 'delete'])
    ->middleware(['auth', 'verified'])
    ->name('saved_object.delete');

Route::post('/saved-links/{savedLinkId}/saved-object', [SavedObjectPropController::class, 'add'])
    ->middleware(['auth', 'verified'])
    ->name('saved_object.add');

Route::get('/shared/saved-links/{sharedKey}', [SavedLinkController::class, 'getOneShared'])
    ->name('shared.saved-links');

Route::get('/shared/download-saved-object/{savedObjectPropId}/{sharedKey}', [SavedObjectPropController::class, 'downloadShared'])
    ->name('shared.download-saved-object');

Route::get('/arguments', [ArgumentController::class, 'home'])
    ->middleware(['auth', 'verified'])
    ->name('arguments-home');

Route::get('/arguments/{argumentTopicId}', [ArgumentController::class, 'detail'])
    ->middleware(['auth', 'verified'])
    ->name('arguments-detail');

Route::post('/arguments', [ArgumentController::class, 'addTopic'])
    ->middleware(['auth', 'verified'])
    ->name('argument-topics.add-topic');

Route::post('/arguments/{argumentTopicId}/argument', [ArgumentController::class, 'addArgument'])
    ->middleware(['auth', 'verified'])
    ->name('arguments-topics.add-argument');

Route::post('/arguments/{argumentTopicId}/link', [ArgumentController::class, 'addLink'])
    ->middleware(['auth', 'verified'])
    ->name('arguments-topics.add-link');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::redirect('/dashboard', '/');
});

require __DIR__ . '/settings.php';
