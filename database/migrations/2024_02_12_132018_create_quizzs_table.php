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
        Schema::create('quizzs', static function (Blueprint $table) {
            $table->id();
            $table->timestamps();

            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            $table->foreignId('video_id')->nullable()->constrained('videos')->cascadeOnDelete();

            $table->string('title');
            $table->string('description');
            $table->text('thumbnail')->default('https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.aflyon.org%2Fwp-content%2Fuploads%2F2018%2F12%2Fquizz.jpg&f=1&nofb=1&ipt=38b6cb8826a0b8b924187ce80548a30f9719467f420232143626ca7a22b53ef5&ipo=images');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('quizzs');
    }
};
