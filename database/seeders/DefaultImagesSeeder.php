<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DefaultImagesSeeder extends Seeder
{
    public function run()
    {
        DB::table('default_images')->insert([
            [
                'name' => 'favicon.png', 
                'url' => '/storage/app/public/imagedefault/favicon.png'  // Ruta relativa desde la carpeta public/
            ],
            [
                'name' => 'icon.png', 
                'url' => '/storage/app/public/imagedefault/icon.png'  // Ruta relativa desde la carpeta public/
            ],
        ]);
    }
}
