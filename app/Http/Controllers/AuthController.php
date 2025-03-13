<?php

namespace App\Http\Controllers;

use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException; 
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use App\Models\User;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    // Método para registrar un nuevo usuario
    public function register(Request $request)
    {
        // Validación de la entrada
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:6|confirmed',
        ]);
    
        if ($validator->fails()) {
            return response()->json(['message' => $validator->errors()->first()], 422);
        }
    
        // Creación del usuario
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        // Intentar crear un token JWT para el usuario
        try {
            $token = JWTAuth::fromUser($user);
        } catch (JWTException $e) {
            return response()->json(['message' => 'No se pudo crear el token'], 500); // Captura de excepción de JWT
        }
    
        // Respuesta de éxito con token
        return response()->json([
            'message' => 'Usuario registrado exitosamente',
            'token' => $token,
            'user' => $user
        ], 201);
    }
    

    // Método para iniciar sesión (login)
    public function login(Request $request)
    {
        // Validación de las credenciales
        $credentials = $request->only('email', 'password');
    
        // Intentar crear un token de forma manual
        try {
            if (!$token = JWTAuth::attempt($credentials)) {
                return response()->json(['message' => 'Credenciales inválidas'], 401);
            }
        } catch (\Exception $e) {
            // Devolver error con detalles si no se puede crear el token
            return response()->json(['message' => 'No se pudo crear el token: ' . $e->getMessage()], 500);
        }
    
        return response()->json([
            'message' => 'Login exitoso',
            'token' => $token,
            'user' => JWTAuth::user(), // Usuario autenticado
        ]);
    }
    
    

    // Método para obtener el usuario autenticado
    public function user(Request $request)
    {
        return response()->json($request->user());
    }

    // Método para cerrar sesión (logout)
    public function logout()
    {
        JWTAuth::invalidate(JWTAuth::getToken()); // Invalidamos el token
        return response()->json(['message' => 'Sesión cerrada correctamente']);
    }
}
