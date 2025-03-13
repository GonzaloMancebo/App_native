<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use App\Models\User;

class UserProfileController extends Controller
{
    // Método GET para obtener el perfil del usuario
    public function getProfile()
    {
        // Obtener el usuario autenticado
        $user = Auth::user();

        if (!$user) {
            return response()->json([
                'message' => 'User not authenticated.'
            ], 401);  // Devolver un error si no está autenticado
        }

        // Devolver solo el nombre del usuario o cualquier otro dato que necesites
        return response()->json([
            'name' => $user->name
        ], 200);
    }

    // Método POST para actualizar el perfil del usuario
    public function updateProfile(Request $request)
    {
        // Validación de los datos del perfil
        $validator = Validator::make($request->all(), [
            'gender' => 'required|string',
            'age' => 'required|integer|min:18',
            'position' => 'required|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg|max:2048', // Imagen opcional
        ]);

        // Si hay errores de validación, devolver respuesta con errores
        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 400);
        }

        // Obtener el usuario autenticado
        $user = Auth::user();

        if (!$user) {
            return response()->json([
                'message' => 'User not authenticated.'
            ], 401);  // Devolver un error si no está autenticado
        }
        
        // Actualizar los campos del perfil
        $user->gender = $request->gender;
        $user->age = $request->age;
        $user->position = $request->position;

        // Si hay una imagen de perfil, manejar la carga
        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $imagePath = $image->store('image', 'public');
            $user->image = $imagePath;
        }

        // Guardar los cambios en la base de datos
        $user->save();

        return response()->json([
            'message' => 'Profile updated successfully',
            'user' => $user
        ], 200);
    }
}
