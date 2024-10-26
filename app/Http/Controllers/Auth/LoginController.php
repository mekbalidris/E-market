<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class LoginController extends Controller
{
    public function showLoginPage(Request $request){
        return Inertia::render('Login');
    }

    public function login(Request $request){
        $request->validate([
            'email' => 'required|email',
            'password'=> 'required',
        ]);

        if(Auth::attempt($request->only('email','password'))){
            return redirect()->intended('/home');
        }

        return redirect()->back()->withErrors([
            'email'=> 'The provided credentails do not match our records.'
        ]);
    }
}
