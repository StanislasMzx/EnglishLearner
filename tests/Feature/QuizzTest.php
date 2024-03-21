<?php

use App\Models\Quizz;
use App\Models\TextField;
use App\Models\User;
use Illuminate\Http\UploadedFile;
use Inertia\Testing\AssertableInertia;

beforeEach(function () {
    $this->user = User::factory()->create();
    $this->actingAs($this->user);
    Storage::fake('public');
});

test('GET : quizz.index - classic', function () {
    Quizz::factory()->count(10)->create();
    $response = $this->getJson(route('quizz.index'));
    $response->assertOk()->assertInertia(function (AssertableInertia $page) {
        $page->component('Dashboard')
            ->has('quizzes')
            ->where('quizzes', Quizz::with('video')->get()->toArray());
    });
});

test('GET - quizz.show - classic', function () {
    $quizz = Quizz::factory()->create();
    $response = $this->getJson(route('quizz.show', ['quizz_id' => $quizz->id]));
    $response->assertOk()->assertInertia(function (AssertableInertia $page) use ($quizz) {
        $page->component('Quizz')
            ->has('quizz')
            ->where('quizz', Quizz::with('video', 'textFields', 'radioButtonsFields.choices')->findOrFail($quizz->id)->toArray());
    });
})->only();

test('POST : quizz.store - classic', function () {
    $quizz = Quizz::factory()->make();
    $response = $this->post(route('quizz.store'), [
        'title' => $quizz->title,
        'video_id' => $quizz->video_id,
        'description' => $quizz->description,
        'video' => UploadedFile::fake()->create('video.mp4', 1024),
    ]);
    $response->assertCreated();
    $this->assertDatabaseHas('quizzs', ['title' => $quizz->title]);
});

test('POST - quizz.store - store elements', function () {
    $quizz = Quizz::factory()->make();
    $textFields = TextField::factory()->count(3)->make();
    $response = $this->post(route('quizz.store'), [
        'title' => $quizz->title,
        'video_id' => $quizz->video_id,
        'description' => $quizz->description,
        'textFields' => $textFields->toArray(),
        'video' => UploadedFile::fake()->create('video.mp4', 1024),
        'radioButtonsFields' => [
            [
                'choices' => [['title' => "test", "is_correct" => true]],
                'title' => "oklm"
            ]
        ]

    ]);
    $response->assertRedirect();
    $this->assertDatabaseHas('quizzs', ['title' => $quizz->title]);
    $this->assertDatabaseHas('videos', ['title' => $quizz->title]);
    // test if ra
    foreach ($textFields as $textField) {
        $this->assertDatabaseHas('text_fields', ['title' => $textField->title]);
    }

    $this->assertDatabaseHas('radio_buttons_fields', ['title' => "oklm"]);
    $this->assertDatabaseHas('choices', ['title' => "test"]);
});
