<?php

use App\Models\Quizz;
use App\Models\User;
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
        $page->component('Dashboard')
            ->has('quizz')
            ->where('quizz', Quizz::with('video')->findOrFail($quizz->id)->toArray());
    });
});
