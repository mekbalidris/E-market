<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Models\Post;

class HomeController extends Controller
{

    public function index(){
        if(Auth::check()){
        
            $posts = Post::with('user')->orderBy("created_at", "desc")->get();


        return Inertia::render('Home', [
            'auth' => [
                'user' => Auth::user(),
            ],
            'posts' => $posts,
        ]);}
        else{
            return Inertia::render('Login');
        }
    }
}
