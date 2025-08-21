<?php

use App\Http\Controllers\Api\CouponController;
use App\Http\Controllers\Api\ProductoController;
use App\Http\Controllers\Api\UserController;
use App\Http\Resources\UserResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->group(function () {
    Route::get('user', function (Request $request) {
        return [
            'user' => UserResource::make($request->user()),
            'access_token' => $request->bearerToken()
        ];
    });
    Route::post('user/logout', [UserController::class, 'logout']);

    //Ruta de los cupones
    Route::post('apply/coupon', [CouponController::class, 'applyCoupon']);
});

//Rutas productos
Route::get('productos', [ProductoController::class, 'index']);
Route::get('productos/{color}/color', [ProductoController::class, 'filterProductosByColor']);
Route::get('productos/{size}/size', [ProductoController::class, 'filterProductosBySize']);
Route::get('productos/{searchTerm}/find', [ProductoController::class, 'filterProductosByTerm']);
Route::get('productos/{producto}/show', [ProductoController::class, 'show']);

//Rutas de los usuarios
Route::post('user/register', [UserController::class, 'store']);
Route::post('user/login', [UserController::class, 'auth']);
