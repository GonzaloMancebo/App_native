<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DefaultImage extends Model
{
    use HasFactory;

    // Nombre de la tabla en la base de datos (opcional, ya que Laravel usa el nombre plural por defecto)
    protected $table = 'default_images';

    // Los campos que son asignables (para evitar la asignación masiva masiva)
    protected $fillable = [
        'name',
        'url',
    ];

    public $timestamps = true;
}
