<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RadioButtonsField extends Model
{
    use HasFactory;

    protected $fillable = [
        'quizz_id', 'title', 'index'
    ];

    public function quizz()
    {
        return $this->belongsTo(Quizz::class);
    }

    public function choices()
    {
        return $this->morphMany(Choice::class, 'choosable');
    }


}
