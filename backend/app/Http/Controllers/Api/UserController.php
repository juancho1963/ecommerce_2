<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\AuthUserRequest;
use App\Http\Requests\StoreUserRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;


class UserController extends Controller
{
    public function store(StoreUserRequest $request) {
        if($request->validated()){
            User::create($request->validated());
            return response()->json([
                'message' => 'Su cuenta ha sido creada exitosamente.'
            ]);
        }
    }

    public function auth(AuthUserRequest $request) {
        if($request->validated()){
            $user = User::whereEmail($request->email)->first();
            if(!$user || !Hash::check($request->password, $user->password)){
                return response()->json([
                    'error' => 'Estas credenciales no coinciden con nuestros registros.'
                ]);
            }else {
                return response()->json([
                    'user' => UserResource::make($user),
                    'access_token' => $user->createToken('new_user')->plainTextToken,
                    'message' => 'Bienvenido a Hoodie Store'
                ]);
            }
        }
    }

    public function logout(Request $request){
        $request->user()->currentAccessToken()->delete();
        return response()->json([
            'message' => 'La sesión fue cerrada con exito.'
        ]);
    }
}
