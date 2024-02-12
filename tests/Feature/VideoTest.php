<?php


use App\Models\Quizz;
use App\Models\User;
use App\Models\Video;
use Illuminate\Http\UploadedFile;

beforeEach(function () {
    $this->user = User::factory()->create();
    $this->actingAs($this->user);
    Storage::fake('public');
});

test('POST : video.post - classic', function () {

    $quizz = Quizz::factory()->create();
    $response = $this->postJson(route('video.store', ['quizz_id' => $quizz->id]), [
        'title' => 'Wtf',
        'video' => UploadedFile::fake()->create('video.mp4', 1024),
    ]);
    $video = Video::first();
    $response->assertCreated();
    \Illuminate\Support\Facades\Storage::disk('public')->assertExists($video->completePath);

    $this->assertDatabaseHas('videos', [
        'title' => $video->title,
    ]);
});
