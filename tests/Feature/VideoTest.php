<?php


use App\Models\Video;
use Inertia\Testing\AssertableInertia;

test('GET : All videos', function () {

    Video::factory()->count(3)->create();

    $response = $this->get('/videos');

    $response->assertOk()->assertInertia(fn (AssertableInertia $page) => $page
        ->component('Welcome')
        ->has('videos')
        ->where('videos', Video::all()->toArray())
    );

});
