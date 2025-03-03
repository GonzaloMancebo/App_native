<?php

use App\Http\Controllers\UserController;
use App\Http\Controllers\MessageController;
use Illuminate\Support\Facades\Route;

Route::get('/users', [UserController::class, 'index']);
Route::post('/chat', [MessageController::class, 'store']);
Route::get('/chat/{userId}', [MessageController::class, 'getMessages']);
