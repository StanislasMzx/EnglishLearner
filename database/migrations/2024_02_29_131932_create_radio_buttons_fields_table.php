<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('radio_buttons_fields', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->foreignId('quizz_id')->constrained();
            $table->integer('index');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('radio_buttons_fields');
    }
};
