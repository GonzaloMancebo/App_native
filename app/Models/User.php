<?php

namespace App\Models;

use Tymon\JWTAuth\Contracts\JWTSubject;  
use Laravel\Sanctum\HasApiTokens;       
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable implements JWTSubject  // Implementar la interfaz JWTSubject
{
    use HasFactory, Notifiable, HasApiTokens;  // Asegúrate de usar HasApiTokens

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'gender',
        'age',
        'position',
        'image',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    // Método requerido por la interfaz JWTSubject
    public function getJWTIdentifier()
    {
        return $this->getKey();  // El identificador único del usuario, normalmente el ID
    }

    // Método requerido por la interfaz JWTSubject
    public function getJWTCustomClaims()
    {
        return [];  // Puedes devolver cualquier reclamo personalizado aquí (si lo necesitas)
    }
}
