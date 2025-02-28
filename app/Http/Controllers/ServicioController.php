<?php

namespace App\Http\Controllers;

use App\Models\Servicio;
use Illuminate\Http\Request;

class ServicioController extends Controller
{
    public function getServicios()
    {
        // Obtener todos los servicios de la base de datos
        $servicios = Servicio::all();

        // Retornar los servicios como respuesta en formato JSON
        return response()->json($servicios);
    }
}
