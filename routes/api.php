<?php

use App\Http\Controllers\ServicioController;
use Illuminate\Support\Facades\Route;

// Ruta de la API para obtener los servicios
Route::get('servicios', [ServicioController::class, 'getServicios']);

// Ruta de prueba para verificar si la API está funcionando
Route::get('/test', function () {
    return response()->json(['message' => 'API funcionando']);
});
