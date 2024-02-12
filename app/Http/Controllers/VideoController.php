<?php

namespace App\Http\Controllers;

use App\Models\Video;
use Illuminate\Contracts\Filesystem\FileNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class VideoController extends Controller
{
    public function index(Request $request): \Inertia\Response
    {
        $videos = Video::all();
        return Inertia::render('Welcome', [
            'videos' => $videos
        ]);
    }

    /**
     * @throws FileNotFoundException
     */
    public function store(Request $request)
    {
        $user = $request->user();
        $request->validate([
            'title' => 'required|string|max:255',
            'video' => 'required|mimes:mp4',
        ]);
        $uploadedFile = $request->file('video');
        $video = Video::create([
            'title' => $request->title,
            'name' => $uploadedFile->hashName(),
            'path' => 'videos/',
            'user_id' => $user->id,
        ]);
        Storage::disk('public')->put($video->completePath, $uploadedFile->get());
        return Inertia::render('Welcome', [
            'videos' => Video::all()
        ])->toResponse($request)->setStatusCode(201);
    }
}
