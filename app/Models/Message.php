<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'message',
        'sender',
        'timestamp',
    ];

    protected $dates = ['timestamp'];  // Esto le dice a Eloquent que 'timestamp' es un campo de fecha
}
