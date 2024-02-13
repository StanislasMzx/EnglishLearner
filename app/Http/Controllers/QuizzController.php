<?php

namespace App\Http\Controllers;

use App\Models\Quizz;
use App\Models\TextField;
use App\Models\Video;
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

    public function store(Request $request): \Illuminate\Http\JsonResponse
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'video_id' => 'required|integer|exists:videos,id',
            'description' => 'required|string',
            'textFields' => 'required|array|nullable',
        ]);

        $quizz = Quizz::create([
            'title' => $validated['title'],
            'description' => $validated['description'],
            'user_id' => $request->user()->id,
            'video_id' => $validated['video_id']
        ]);

        $textFields = [];
        foreach ($validated['textFields'] as $textField) {
            $textFields[] = array_merge($textField, ['quizz_id' => $quizz->id]);
        }


        TextField::insert($textFields);



        return response()->json([
            'message' => 'Quizz created successfully'
        ], 201);
    }
}
