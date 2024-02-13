<?php

namespace Database\Factories;

use App\Models\Choice;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Carbon;

class ChoiceFactory extends Factory
{
    protected $model = Choice::class;

    public function definition(): array
    {
        return [
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
            'choosable_id' => $this->faker->randomNumber(),
            'choosable_type' => $this->faker->word(),
            'is_correct' => $this->faker->boolean(),
        ];
    }
}
