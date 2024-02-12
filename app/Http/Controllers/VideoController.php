<?php

namespace App\Http\Controllers;

use App\Models\Quizz;
use App\Models\Video;
use Illuminate\Contracts\Filesystem\FileNotFoundException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpFoundation\Response;
use Throwable;

class VideoController extends Controller
{

    /**
     * @throws FileNotFoundException
     * @throws Throwable
     */
    public function store(Request $request, int $quizzId): JsonResponse
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'video' => 'required|mimes:mp4',
        ]);
        $uploadedFile = $request->file('video');
        $video = Video::create([
            'title' => $request->title,
            'name' => $uploadedFile->hashName(),
            'path' => 'videos/',
        ]);
        Quizz::findOrFail($quizzId)->video()->associate($video)->saveOrFail();
        Storage::disk('public')->put($video->completePath, $uploadedFile->get());
        return response()->json(['message' => 'Video uploaded successfully'], Response::HTTP_CREATED);
    }
}
