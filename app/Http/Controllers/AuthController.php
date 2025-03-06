<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator; 

class AuthController extends Controller
{
    // Método para registrar un nuevo usuario
    public function register(Request $request)
    {
        // Validación de los datos de entrada
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email', // Validación de correo único
            'password' => 'required|string|min:6|confirmed', // Contraseña mínima de 6 caracteres y confirmación de contraseña
        ]);

        // Si la validación falla
        if ($validator->fails()) {
            return response()->json(['message' => $validator->errors()->first()], 422);
        }

        // Crear el usuario si la validación es exitosa
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        // Crear el token para el usuario recién registrado
        $token = $user->createToken('MobileApp')->plainTextToken;

        return response()->json([
            'message' => 'Usuario registrado exitosamente',
            'token' => $token,
            'user' => $user
        ], 201);
    }

    // Método para iniciar sesión (login)
    public function login(Request $request)
    {
        // Validar los datos de entrada
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required|min:6',
        ]);

        // Si la validación falla
        if ($validator->fails()) {
            return response()->json(['message' => 'Invalid credentials'], 400);
        }

        // Intentar autenticar al usuario
        if (Auth::attempt(['email' => $request->email, 'password' => $request->password])) {
            // Obtener el usuario autenticado
            $user = Auth::user();

            // Crear un token de acceso
            $token = $user->createToken('MobileApp')->plainTextToken;

            // Devolver el token y el usuario autenticado
            return response()->json([
                'message' => 'Login exitoso',
                'token' => $token,
                'user' => $user,
            ]);
        }

        // Si la autenticación falla, devolver un error genérico
        return response()->json(['message' => 'Invalid credentials'], 401);
    }

    // Método para obtener el usuario autenticado
    public function user(Request $request)
    {
        return response()->json($request->user());
    }

    // Método para cerrar sesión (logout)
    public function logout(Request $request)
    {
        // Eliminar la cookie de autenticación (tokens)
        $request->user()->tokens->each(function ($token) {
            $token->delete();
        });

        return response()->json(['message' => 'Successfully logged out']);
    }
}
