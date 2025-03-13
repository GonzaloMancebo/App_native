<?php

namespace App\Http\Controllers;

use App\Models\DefaultImage;
use Illuminate\Http\Request;

class DefaultImageController extends Controller
{
    public function getDefaultImages()
    {
        $images = DefaultImage::all(); 

        return response()->json($images);
    }
}

