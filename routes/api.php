<?php

use App\Http\Controllers\UserController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\AuthController; 
use App\Http\Controllers\UserProfileController;
use Illuminate\Support\Facades\Route;

Route::post('/login', [AuthController::class, 'login']);  // Ruta de login para obtener el token
Route::post('/register', [AuthController::class, 'register']);  // Ruta de registro de usuario

// Rutas protegidas por Sanctum
Route::middleware('auth:sanctum')->group(function () {
    // Rutas de usuarios y mensajes solo accesibles si el usuario está autenticado
    Route::get('/users', [UserController::class, 'index']);  // Mostrar usuarios (sólo para usuarios autenticados)
    
    // Ruta para enviar un nuevo mensaje
    Route::post('/chat', [MessageController::class, 'store']);  // Enviar mensaje (requiere autenticación)
    
    // Obtener mensajes de un usuario específico
    Route::get('/chat/{userId}', [MessageController::class, 'getMessages']);  // Ver mensajes de un usuario específico
    
    // Obtener usuarios que tienen mensajes
    Route::get('/chat/users', [MessageController::class, 'getUsersWithMessages']);  // Obtener todos los usuarios con mensajes

    Route::middleware('auth:sanctum')->post('/update-profile', [UserProfileController::class, 'updateProfile']);

});

