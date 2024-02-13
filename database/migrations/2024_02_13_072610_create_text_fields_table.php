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
        Schema::create('text_fields', function (Blueprint $table) {
            $table->id();
            $table->timestamps();

            $table->foreignId('quizz_id')->constrained()->cascadeOnDelete();

            $table->integer('index');
            $table->string('title');
            $table->text('placeholder')->default('');
            $table->string('answer');

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('text_fields');
    }
};
