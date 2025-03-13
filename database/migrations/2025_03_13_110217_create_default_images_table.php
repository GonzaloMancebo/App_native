<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDefaultImagesTable extends Migration
{
    public function up()
    {
        Schema::create('default_images', function (Blueprint $table) {
            $table->id();
            $table->string('name'); // Nombre de la imagen (por ejemplo, "avatar.jpg")
            $table->string('url'); // URL de la imagen en el servidor
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('default_images');
    }
}
