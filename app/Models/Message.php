<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    use HasFactory;

    // Indica qué campos se pueden llenar de forma masiva (masse-assignment)
    protected $fillable = [
        'user_id',
        'message',
        'sender',
        'timestamp',
    ];

    
}
