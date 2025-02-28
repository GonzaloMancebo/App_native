<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Servicio extends Model
{
    use HasFactory;

    // Si la tabla en la base de datos no es plural, puedes especificar el nombre de la tabla:
    // protected $table = 'servicios';

    // Campos que se pueden asignar masivamente
    protected $fillable = [
        'nombre',       // Nombre del servicio
        'descripcion',  // Descripción del servicio
        'precio',       // Precio del servicio
        'imagen',       // URL o path de la imagen
        'categoria',    // Categoría del servicio (barbería, estilismo, etc.)
    ];

    // Si los nombres de las columnas en tu tabla son diferentes, puedes cambiar estos valores.
    // Ejemplo:
    // const UPDATED_AT = null; // Si no tienes un campo `updated_at` en la tabla.
}
