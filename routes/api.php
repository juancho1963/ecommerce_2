<?php

use App\Http\Controllers\Api\ProductoController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('productos', [ProductoController::class, 'index']);
Route::get('productos/{color}/color', [ProductoController::class, 'filterProductosByColor']);
Route::get('productos/{size}/size', [ProductoController::class, 'filterProductosBySize']);
Route::get('productos/{searchTerm}/find', [ProductoController::class, 'filterProductosByTerm']);
Route::get('productos/{producto}/show', [ProductoController::class, 'show']);
