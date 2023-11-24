<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

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


        ]);
    }

}
