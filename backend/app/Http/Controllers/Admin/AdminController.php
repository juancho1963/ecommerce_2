<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\AuthAdminRequest;
use App\Models\Order;
use Carbon\Carbon;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    public function index() {  // funcion presentar vista principal

        $todayOrders = Order::whereDay('created_at', Carbon::today())->get();
        $yesterdayOrders = Order::whereDay('created_at', Carbon::yesterday())->get();
        $monthOrders = Order::whereMonth('created_at', Carbon::now()->month)->get();
        $yearOrders = Order::whereyear('created_at', Carbon::now()->year)->get();

        return view('admin.index')->with([
            'todayOrders' => $todayOrders,
            'yesterdayOrders' => $yesterdayOrders,
            'monthOrders' => $monthOrders,
            'yearOrders' => $yearOrders,
        ]);
    }

    public function login() {  // funcion abrir sesion del registrado
        if(!auth()->guard('admin')->check()){
            return view('admin.login');
        }
        return redirect()->route('admin.index');
    }

    public function auth(AuthAdminRequest $request) { // funcion autenticar la sesion del registrado
        if($request->validated()){
            if(auth()->guard('admin')->attempt([
                'email' => $request->email,
                'password' => $request->password,
            ])){
                $request->session()->regenerate();
                return redirect()->route('admin.index');
            }else{
                return redirect()->route('admin.login')->with([
                    'error' => 'Las credenciales ingresadas no coinciden con nuestros registros'
                ]);
            }
        }
    }

    public function logout(){  // funcion cerrar sesion del registrado
        auth()->guard('admin')->logout();
        return redirect()->route('admin.index');
    }
}
