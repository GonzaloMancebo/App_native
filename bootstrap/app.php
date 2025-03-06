<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use App\Http\Middleware\HandleCors;
use Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful;  // Agregar el middleware de Sanctum

return Application::configure(basePath: dirname(__DIR__))  // Configura la ruta base de la aplicación
    ->withRouting(  // Configura las rutas de la aplicación
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',  // Rutas para la API
        commands: __DIR__.'/../routes/console.php',
        health: '/up',  // Ruta para verificar la salud del sistema
    )
    ->withMiddleware(function (Middleware $middleware) {  // Agregar middleware a la aplicación
        $middleware->append(HandleCors::class);  // Middleware para manejar CORS
        $middleware->append(EnsureFrontendRequestsAreStateful::class);  // Middleware de Sanctum para manejo de tokens
        // Aquí puedes agregar otros middleware según sea necesario
    })
    ->withExceptions(function (Exceptions $exceptions) {
        // Manejo de excepciones personalizadas si es necesario
    })
    ->create();  // Crear la instancia de la aplicación
