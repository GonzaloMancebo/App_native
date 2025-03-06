<?php

namespace App\Http\Controllers;

use App\Models\Message;
use App\Models\User;
use Illuminate\Http\Request;

class MessageController extends Controller
{
    // Guardar un mensaje en la base de datos
    public function store(Request $request)
    {
        // Validación de los datos recibidos
        $validated = $request->validate([
            'user_id' => 'required|integer',
            'message' => 'required|string',
            'sender' => 'required|integer', // Ahora el sender también es un ID de usuario
            'timestamp' => 'required|date_format:Y-m-d H:i:s',
        ]);

        // Crear el mensaje en la base de datos
        $message = Message::create($validated);

        return response()->json($message, 201);
    }

    // Obtener todos los usuarios que han tenido conversaciones
    public function getUsersWithMessages()
    {
        // Obtener todos los IDs únicos de usuarios en la tabla de mensajes
        $userIds = Message::select('user_id')
                          ->union(Message::select('sender'))
                          ->distinct()
                          ->pluck('user_id') // Los mensajes recibidos por el usuario
                          ->toArray(); // ⚠️ Convertir a array para merge correcto
        
        $senderIds = Message::distinct()->pluck('sender')->toArray(); // Los mensajes enviados por el usuario
        
        // Fusionar y eliminar duplicados
        $allUserIds = array_unique(array_merge($userIds, $senderIds)); // Aquí estamos agregando todos los usuarios que han enviado o recibido mensajes
        
        if (empty($allUserIds)) {
            return response()->json([]); // No hay conversaciones
        }
        
        // Obtener los datos de los usuarios con el último mensaje enviado/recibido
        $users = User::whereIn('id', $allUserIds)->get()->map(function ($user) {
            $lastMessage = Message::where('user_id', $user->id)
                                  ->orWhere('sender', $user->id)
                                  ->orderBy('timestamp', 'desc')
                                  ->first();
            
            return [
                'id' => $user->id,
                'name' => $user->name,
                'image' => $user->image ?? 'https://example.com/default-profile.jpg',
                'last_message' => $lastMessage ? $lastMessage->message : 'No hay mensajes',
                'timestamp' => $lastMessage ? $lastMessage->timestamp : null,
            ];
        });
    
        return response()->json($users);
    }
    
    
    

    public function getMessages($userId)
{
    // Obtener los mensajes donde el usuario es el remitente o destinatario
    $messages = Message::where('user_id', $userId)
                        ->orWhere('sender', $userId)
                        ->orderBy('timestamp', 'asc')
                        ->get();

    return response()->json($messages);
}

}
