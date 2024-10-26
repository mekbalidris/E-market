<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class RegisterController extends Controller
{
    public function showRgisterPage(Request $request){
        return Inertia::render('Register');
    }

    public function register(Request $request){
        $validatedRequest = $request->validate([
            'name' => 'required',
            'email'=> 'required|email|unique:users,email',
            'password'=> 'required|confirmed|min:8', 
        ]);

        $user = User::create([
            'name'=> $validatedRequest['name'],
            'email'=> $validatedRequest['email'],
            'password'=> Hash::make($validatedRequest['password']),
        ]);

        Auth::login($user);

        return redirect()->route('home');
    }
}
