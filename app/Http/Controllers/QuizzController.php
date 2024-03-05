<?php

namespace App\Http\Controllers;

use App\Models\Choice;
use App\Models\Quizz;
use App\Models\RadioButtonsField;
use App\Models\TextField;
use App\Models\Video;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class QuizzController extends Controller
{
    public function index(Request $request): Response
    {
        $quizzes = Quizz::with('video')->get();
        return Inertia::render('Dashboard', [
            'quizzes' => $quizzes
        ]);
    }

    public function show(Request $request, int $quizz_id): Response
    {
        $quizz = Quizz::with('video')->findOrFail($quizz_id);
        return Inertia::render('Quizz', [
            'quizz' => $quizz
        ]);
    }

    public function store(Request $request): JsonResponse
    {


        DB::transaction(static function () use ($request) {

            $validated = $request->validate([
                'title' => 'required|string|max:255',
                'description' => 'required|string',
                'textFields' => 'array|nullable',
                'RadioButtonsFields' => 'array|nullable',
                'RadioButtonsFields.*.choices' => 'array|nullable',
                'video' => 'required|mimes:mp4',
            ]);


            $uploadedFile = $request->file('video');
            $video = Video::create([
                'title' => $request->title,
                'name' => $uploadedFile->hashName(),
                'path' => 'videos/',
            ]);

            Storage::disk('public')->put($video->completePath, $uploadedFile->get());

            $quizz = Quizz::create([
                'title' => $validated['title'],
                'description' => $validated['description'],
                'user_id' => $request->user()->id,
                'video_id' => $video->id
            ]);

            if (isset($validated['textFields'])) {
                $textFields = [];
                foreach ($validated['textFields'] as $textField) {
                    $textFields[] = array_merge($textField, ['quizz_id' => $quizz->id]);
                }
                TextField::insert($textFields);
            }


            if (isset($validated['radioButtonsFields'])) {
                $radioButtonsFields = [];
                foreach ($validated['radioButtonsFields'] as $radioButtonsField) {
                    $radioButtonsFields[] = array_merge($radioButtonsField, ['quizz_id' => $quizz->id]);
                    $group = RadioButtonsField::create($radioButtonsFields);
                    $choices = [];
                    foreach ($radioButtonsField['choices'] as $choice) {
                        $choices[] = array_merge($choice, ['choosable_id' => $group->id, 'choosable_type' => RadioButtonsField::class]);
                    }
                    Choice::insert($choices);
                }
            }

        });
        return response()->json([
            'message' => 'Quizz created successfully'
        ], 201);
    }
}
