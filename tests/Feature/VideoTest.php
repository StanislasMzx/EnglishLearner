<?php


use App\Models\User;
use App\Models\Video;
use Illuminate\Http\UploadedFile;
use Inertia\Testing\AssertableInertia;

beforeEach(function () {
    $this->user = User::factory()->create();
    $this->actingAs($this->user);
    Storage::fake('public');
});

test('GET : All videos', function () {

    Video::factory()->count(3)->create();

    $response = $this->get('/dashboard/videos');

    $response->assertOk()->assertInertia(fn(AssertableInertia $page) => $page
        ->component('Dashboard')
        ->has('videos')
        ->where('videos', Video::all()->toArray())
    );
});

test('POST : New Video', function () {

    $response = $this->post('/dashboard/videos', [
        'title' => 'Wtf',
        'video' => UploadedFile::fake()->create('video.mp4', 1024),
    ]);
    $video = Video::first();

    $response->assertCreated();
    \Illuminate\Support\Facades\Storage::disk('public')->assertExists($video->completePath);

    $this->assertDatabaseHas('videos', [
        'title' => $video->title,
        'user_id' => $this->user->id,
    ]);
});
