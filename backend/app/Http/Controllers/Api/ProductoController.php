<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ProductoResource;
use App\Models\Color;
use App\Models\Producto;
use App\Models\Size;
use Illuminate\Http\Request;

class ProductoController extends Controller
{
    public function index() {
        return ProductoResource::collection(Producto::with(['colors','sizes','reviews'])->latest()->get())
            ->additional([
                'colors' => Color::has('productos')->get(),
                'sizes' => Size::has('productos')->get(),
            ]);
    }

    public function show(Producto $producto) {
        return ProductoResource::make(
            $producto->load(['colors','sizes','reviews'])
        );
    }

    public function filterProductosByColor(Color $color) {
        return ProductoResource::collection(
            $color->productos()->with(['colors','sizes','reviews'])->latest()->get())
            ->additional([
                'colors' => Color::has('productos')->get(),
                'sizes' => Size::has('productos')->get(),
            ]);
    }

    public function filterProductosBySize(Size $size) {
        return ProductoResource::collection(
            $size->productos()->with(['colors','sizes','reviews'])->latest()->get())
            ->additional([
                'colors' => Color::has('productos')->get(),
                'sizes' => Size::has('productos')->get(),
            ]);
    }

    public function filterProductosByTerm($searchTerm) {
        return ProductoResource::collection(
            Producto::where('name','LIKE','%'.$searchTerm.'%')
            ->with(['colors','sizes','reviews'])->latest()->get())
            ->additional([
                'colors' => Color::has('productos')->get(),
                'sizes' => Size::has('productos')->get(),
            ]);
    }
}
