<?php

namespace App\Http\Controllers;

use App\Models\Choice;
use App\Models\Quizz;
use App\Models\RadioButtonsField;
use App\Models\TextField;
use App\Models\Video;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\ValidationException;
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
        $video_src = $quizz->video->url;
        return Inertia::render('Quizz', [
            'quizz' => $quizz,
            'video_src' => $video_src,
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
                    'radioButtonsFields.*.index' => 'required|int',
                    'radioButtonsFields.*.choices' => 'array|nullable',
                    'radioButtonsFields.*.title' => 'required|string',
                    'video' => 'required|mimes:mp4,mp3|max:12500',
                    'thumbnail' => 'mimes:jpeg,png|max:5000',
                ]);


                $uploadedFile = $request->file('video');
                $video = Video::create([
                    'title' => $uploadedFile->getClientOriginalName(),
                    'name' => $uploadedFile->hashName(),
                    'path' => 'videos/',
                ]);

                Storage::disk('public')->put($video->completePath, $uploadedFile->get());

                $path = null;
                if ($request->hasFile('thumbnail')) {
                    $uploadedFile = $request->file('thumbnail');

                    Storage::disk('public')->put('thumbnails/' . $uploadedFile->hashName(), $uploadedFile->get());
                    $path = 'thumbnails/' . $uploadedFile->hashName();
                }


                $quizz = Quizz::create([
                    'title' => $validated['title'],
                    'description' => $validated['description'],
                    'user_id' => $request->user()->id,
                    'video_id' => $video->id,
                    'thumbnail' => $path,
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
                            'quizz_id' => $quizz->id,
                            'index' => $radioButtonsField['index'],
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

        } catch (ValidationException $e) {
            DB::rollBack();

            return redirect()->back()->withErrors($e->validator)->withInput();
        } catch (\Exception $e) {
            DB::rollBack();

            dd($e->getMessage());
            return redirect()->route('quizz.index');
        }
    }

    public function destroy(Request $request, int $quizz_id): \Illuminate\Http\RedirectResponse
    {
        $quizz = Quizz::findOrFail($quizz_id);
        $quizz->delete();
        return redirect()->route('quizz.index');
    }

    public function update(Request $request, int $quizz_id): \Illuminate\Http\RedirectResponse
    {
        $quizz = Quizz::findOrFail($quizz_id);
        $quizz->update($request->all());
        return redirect()->route('quizz.show', ['quizz_id' => $quizz->id]);
    }

    public function validateAnswers(Request $request, int $quizz_id): \Illuminate\Http\RedirectResponse
    {
        $quizz = Quizz::with('radioButtonsFields.choices')->findOrFail($quizz_id);
        $radioButtonsFields = $quizz->radioButtonsFields;
        $answers = $request->all();
        $score = 0;
        foreach ($radioButtonsFields as $radioButtonsField) {
            $correctChoice = $radioButtonsField->choices->firstWhere('is_correct', true);
            if ($answers[$radioButtonsField->id] === $correctChoice->id) {
                $score++;
            }
        }
        return redirect()->route('quizz.show', ['quizz_id' => $quizz->id])->with('score', $score);
    }
}
