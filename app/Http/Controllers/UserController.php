<?php

namespace App\Http\Controllers;

use App\Models\User;

class UserController extends Controller
{
    public function index()
    {
        $users = User::all()->map(function($user) {
            return [
                'id' => $user->id,
                'name' => $user->name,
                'age' => $user->age,
                'gender' => $user->gender,
                'position' => $user->position,
                'available' => (bool) $user->available, 
                'image' => $user->image,
            ];
        });

        return response()->json($users);
    }
}
