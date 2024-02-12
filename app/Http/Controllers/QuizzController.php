<?php

namespace App\Http\Controllers;

use App\Models\Quizz;
use Illuminate\Http\Request;
use Inertia\Inertia;

class QuizzController extends Controller
{
    public function index(Request $request): \Inertia\Response
    {
        $quizzes = Quizz::with('video')->get();
        return Inertia::render('Dashboard', [
            'quizzes' => $quizzes
        ]);
    }

    public function show(Request $request, int $quizz_id): \Inertia\Response
    {
        $quizz = Quizz::with('video')->findOrFail($quizz_id);
        return Inertia::render('Quizz', [
            'quizz' => $quizz
        ]);
    }
}
