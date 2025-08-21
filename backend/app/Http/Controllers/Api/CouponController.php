<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Coupon;
use Illuminate\Http\Request;

class CouponController extends Controller
{
    public function applyCoupon(Request $request)
    {
        $coupon = Coupon::whereName($request->name)->first();
        if($coupon && $coupon->checkIfValid()){
            return response()->json([
                'message' => 'El cupón ha sido aplicado exitosamente.',
                'coupon' => $coupon
            ]);
        }else {
            return response()->json([
                'error' => 'El cupón ingresado no es válido o ha expirado.'
            ]);
        }
    }
}
