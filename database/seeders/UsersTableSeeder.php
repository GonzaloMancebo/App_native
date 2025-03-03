<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class UsersTableSeeder extends Seeder
{
    /**
     * Ejecuta la siembra de la base de datos.
     *
     * @return void
     */
    public function run()
    {
        $users = [
            ['id' => 1, 'name' => 'Juan', 'age' => 25, 'position' => 'Delantero', 'available' => true, 'gender' => 'male', 'image' => 'https://randomuser.me/api/portraits/men/1.jpg', 'email' => 'juan@example.com', 'password' => bcrypt('password123'), 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['id' => 2, 'name' => 'Maria', 'age' => 22, 'position' => 'Defensa', 'available' => false, 'gender' => 'female', 'image' => 'https://randomuser.me/api/portraits/women/2.jpg', 'email' => 'maria@example.com', 'password' => bcrypt('password123'), 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['id' => 3, 'name' => 'Carlos', 'age' => 28, 'position' => 'Mediocampista', 'available' => true, 'gender' => 'male', 'image' => 'https://randomuser.me/api/portraits/men/3.jpg', 'email' => 'carlos@example.com', 'password' => bcrypt('password123'), 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['id' => 4, 'name' => 'Laura', 'age' => 24, 'position' => 'Delantero', 'available' => false, 'gender' => 'female', 'image' => 'https://randomuser.me/api/portraits/women/4.jpg', 'email' => 'laura@example.com', 'password' => bcrypt('password123'), 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['id' => 5, 'name' => 'Pedro', 'age' => 26, 'position' => 'Portero', 'available' => true, 'gender' => 'male', 'image' => 'https://randomuser.me/api/portraits/men/5.jpg', 'email' => 'pedro@example.com', 'password' => bcrypt('password123'), 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['id' => 6, 'name' => 'Ana', 'age' => 30, 'position' => 'Defensa', 'available' => false, 'gender' => 'female', 'image' => 'https://randomuser.me/api/portraits/women/6.jpg', 'email' => 'ana@example.com', 'password' => bcrypt('password123'), 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['id' => 7, 'name' => 'Jorge', 'age' => 23, 'position' => 'Mediocampista', 'available' => true, 'gender' => 'male', 'image' => 'https://randomuser.me/api/portraits/men/7.jpg', 'email' => 'jorge@example.com', 'password' => bcrypt('password123'), 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['id' => 8, 'name' => 'Sofia', 'age' => 27, 'position' => 'Delantero', 'available' => true, 'gender' => 'female', 'image' => 'https://randomuser.me/api/portraits/women/8.jpg', 'email' => 'sofia@example.com', 'password' => bcrypt('password123'), 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['id' => 9, 'name' => 'Luis', 'age' => 29, 'position' => 'Defensa', 'available' => false, 'gender' => 'male', 'image' => 'https://randomuser.me/api/portraits/men/9.jpg', 'email' => 'luis@example.com', 'password' => bcrypt('password123'), 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['id' => 10, 'name' => 'Patricia', 'age' => 31, 'position' => 'Portero', 'available' => true, 'gender' => 'female', 'image' => 'https://randomuser.me/api/portraits/women/10.jpg', 'email' => 'patricia@example.com', 'password' => bcrypt('password123'), 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['id' => 11, 'name' => 'Roberto', 'age' => 27, 'position' => 'Mediocampista', 'available' => true, 'gender' => 'male', 'image' => 'https://randomuser.me/api/portraits/men/11.jpg', 'email' => 'roberto@example.com', 'password' => bcrypt('password123'), 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['id' => 12, 'name' => 'Marta', 'age' => 25, 'position' => 'Delantero', 'available' => true, 'gender' => 'female', 'image' => 'https://randomuser.me/api/portraits/women/12.jpg', 'email' => 'marta@example.com', 'password' => bcrypt('password123'), 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['id' => 13, 'name' => 'Andres', 'age' => 28, 'position' => 'Portero', 'available' => false, 'gender' => 'male', 'image' => 'https://randomuser.me/api/portraits/men/13.jpg', 'email' => 'andres@example.com', 'password' => bcrypt('password123'), 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['id' => 14, 'name' => 'Elena', 'age' => 26, 'position' => 'Defensa', 'available' => true, 'gender' => 'female', 'image' => 'https://randomuser.me/api/portraits/women/14.jpg', 'email' => 'elena@example.com', 'password' => bcrypt('password123'), 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['id' => 15, 'name' => 'David', 'age' => 30, 'position' => 'Mediocampista', 'available' => false, 'gender' => 'male', 'image' => 'https://randomuser.me/api/portraits/men/15.jpg', 'email' => 'david@example.com', 'password' => bcrypt('password123'), 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['id' => 16, 'name' => 'Isabel', 'age' => 32, 'position' => 'Delantero', 'available' => true, 'gender' => 'female', 'image' => 'https://randomuser.me/api/portraits/women/16.jpg', 'email' => 'isabel@example.com', 'password' => bcrypt('password123'), 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['id' => 17, 'name' => 'Raul', 'age' => 26, 'position' => 'Defensa', 'available' => true, 'gender' => 'male', 'image' => 'https://randomuser.me/api/portraits/men/17.jpg', 'email' => 'raul@example.com', 'password' => bcrypt('password123'), 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['id' => 18, 'name' => 'Beatriz', 'age' => 23, 'position' => 'Mediocampista', 'available' => true, 'gender' => 'female', 'image' => 'https://randomuser.me/api/portraits/women/18.jpg', 'email' => 'beatriz@example.com', 'password' => bcrypt('password123'), 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['id' => 19, 'name' => 'Fernando', 'age' => 29, 'position' => 'Portero', 'available' => true, 'gender' => 'male', 'image' => 'https://randomuser.me/api/portraits/men/19.jpg', 'email' => 'fernando@example.com', 'password' => bcrypt('password123'), 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['id' => 20, 'name' => 'Carmen', 'age' => 24, 'position' => 'Delantero', 'available' => false, 'gender' => 'female', 'image' => 'https://randomuser.me/api/portraits/women/20.jpg', 'email' => 'carmen@example.com', 'password' => bcrypt('password123'), 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()]
        ];
        

        // Insertar los usuarios
        DB::table('users')->insert($users);
    }
}
