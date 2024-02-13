<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TextField extends Model
{
    use HasFactory;

    protected $fillable = [
        'quizz_id', 'title', 'placeholder', 'answer',
    ];

    public function quizz()
    {
        return $this->belongsTo(Quizz::class);
    }


}
