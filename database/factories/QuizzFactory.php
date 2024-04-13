<?php

namespace Database\Factories;

use App\Models\Quizz;
use App\Models\User;
use App\Models\Video;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Carbon;

class QuizzFactory extends Factory
{
    protected $model = Quizz::class;

    public function definition(): array
    {
        return [
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
            'title' => $this->faker->word(),
            'difficulty' => random_int(1, 5),
            'description' => $this->faker->text(),
            'user_id' => User::factory()->create()->id,
            'video_id' => Video::factory()->create()->id,
        ];
    }
}
