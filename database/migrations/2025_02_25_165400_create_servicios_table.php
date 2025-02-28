<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateServiciosTable extends Migration
{
    public function up()
    {
        Schema::create('servicios', function (Blueprint $table) {
            $table->id();  // ID de servicio
            $table->string('nombre');  // Nombre del servicio
            $table->text('descripcion');  // Descripción del servicio
            $table->decimal('precio', 8, 2);  // Precio (ej. 999.99)
            $table->string('imagen');  // URL o path de la imagen
            $table->string('categoria');  // Categoría (ej. barbería, estilismo)
            $table->timestamps();  // Tiempos de creación y actualización
        });
    }

    public function down()
    {
        Schema::dropIfExists('servicios');
    }
}
