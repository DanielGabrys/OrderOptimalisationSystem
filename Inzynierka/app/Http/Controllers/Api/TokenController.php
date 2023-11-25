<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Grid;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Vinkla\Hashids\Facades\Hashids;

class TokenController extends Controller
{
    public function index()
    {
        $user=Auth::user();
        $user->tokens()->delete();
        $token = $user->createToken('woos_token')->plainTextToken;


        return view('profile.edit', [
            'user' => Auth::user(),
            'token' => $token,
            'merchant' => self::generateHash(),


        ]);
    }

    public static function generateHash()
    {
        $user=Auth::user();
        $key = 4583928432937483;
        $salt = ($key).($user->id);


        return Hashids::encode($salt);
    }

}
