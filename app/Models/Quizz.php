<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Quizz extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'user_id',
        'video_id'
    ];

    public function video(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(Video::class);
    }

    public function user(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function textFields(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(TextField::class);
    }

    public function radioButtonsFields(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(RadioButtonsField::class);
    }



}
