<?php

namespace App\Http\Controllers;

use App\Models\Message;
use Illuminate\Http\Request;

class MessageController extends Controller
{
    public function store(Request $request)
    {
        // Validación de los datos recibidos
        $validated = $request->validate([
            'user_id' => 'required|integer',
            'message' => 'required|string',
            'sender' => 'required|string',
            'timestamp' => 'required|date',
        ]);

        // Crear el mensaje en la base de datos
        $message = Message::create([
            'user_id' => $validated['user_id'],
            'message' => $validated['message'],
            'sender' => $validated['sender'],
            'timestamp' => $validated['timestamp'],
        ]);

        // Responder con el mensaje creado
        return response()->json($message, 201);
    }

    public function getMessages($userId)
{
    // Aquí debes recuperar los mensajes del usuario con el ID proporcionado
    $messages = Message::where('user_id', $userId)->get();
    return response()->json($messages);
}
}
