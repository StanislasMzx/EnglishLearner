<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\QuizzController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
})->name('upload.index');

Route::prefix('dashboard')->group(function () {
    Route::prefix('quizz')->group(function () {
        Route::prefix('builder')->group(function () {
            Route::get('/', static function () {
                return Inertia::render('Builder');
            })->name('builder.index');
        });
        Route::get('/', [QuizzController::class, 'index'])->name('quizz.index');
        Route::get('/{quizz_id}', [QuizzController::class, 'show'])->name('quizz.show');
        Route::post('/{quizz_id}', [QuizzController::class, 'validateAnswers'])->name('quizz.validate-answers');
        Route::delete('/{quizz_id}', [QuizzController::class, 'destroy'])->name('quizz.destroy');

        Route::post('/', [QuizzController::class, 'store'])->name('quizz.store');
    });
});

require __DIR__.'/auth.php';
