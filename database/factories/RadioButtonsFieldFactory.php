<?php

namespace Database\Factories;

use App\Models\Quizz;
use App\Models\RadioButtonsField;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Carbon;

class RadioButtonsFieldFactory extends Factory
{
    protected $model = RadioButtonsField::class;

    public function definition(): array
    {
        return [
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
            'index' => $this->faker->randomNumber(),

            'quizz_id' => Quizz::factory()->create()->id,
        ];
    }
}
