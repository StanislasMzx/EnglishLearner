<?php

namespace Database\Factories;

use App\Models\Quizz;
use App\Models\TextField;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Carbon;

class TextFieldFactory extends Factory
{
    protected $model = TextField::class;

    public function definition(): array
    {
        return [
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
            'quizz_id' => Quizz::factory()->create()->id,
            'title' => $this->faker->word(),
            'placeholder' => $this->faker->word(),
            'answer' => $this->faker->word(),
            'index' => $this->faker->randomNumber(2),
        ];
    }
}
