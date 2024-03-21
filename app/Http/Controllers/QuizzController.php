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
            'quizzes' => $quizzes,
        ]);
    }

    public function show(Request $request, int $quizz_id): Response
    {
        $quizz = Quizz::with('video', 'textFields', 'radioButtonsFields.choices')->findOrFail($quizz_id);
        return Inertia::render('Quizz', [
            'quizz' => $quizz,
            'video_src' => Storage::disk('public')->url($quizz->video->path . $quizz->video->name),
        ]);
    }

    public function store(Request $request): \Illuminate\Http\RedirectResponse
    {
        DB::beginTransaction();

        try {
                $validated = $request->validate([
                    'title' => 'required|string|max:255',
                    'description' => 'required|string',
                    'textFields' => 'array|nullable',
                    'radioButtonsFields' => 'array|nullable',
                    'radioButtonsFields.*.choices' => 'array|nullable',
                    'radioButtonsFields.*.title' => 'required|string',
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

                    foreach ($validated['radioButtonsFields'] as $radioButtonsField) {
                        $group = RadioButtonsField::create([
                            'title' => $radioButtonsField['title'],
                            'quizz_id' => $quizz->id
                        ]);
                        $choices = [];
                        foreach ($radioButtonsField['choices'] as $choice) {
                            $choices[] = array_merge($choice, ['choosable_id' => $group->id, 'choosable_type' => RadioButtonsField::class]);
                        }
                        Choice::insert($choices);
                    }
                }

                DB::commit();

                return redirect()->route('quizz.show', ['quizz_id' => $quizz->id]);

        } catch (\Exception $e) {
            // dd($e->getMessage());
            return redirect()->route('quizz.index');
        }
    }
}
