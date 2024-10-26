<?php

use App\Http\Controllers\Auth\HomeController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\LogoutController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\PostController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MessageController;

Route::get('/login', [LoginController::class, 'showLoginPage'])->name('login')->middleware('guest');;
Route::post('/login', [LoginController::class, 'login'])->middleware('guest');

Route::get('/register', action: [RegisterController::class, 'showRgisterPage'])->name('register')->middleware('guest');;
Route::post('/register', [RegisterController::class, 'register'])->middleware('guest');

Route::get('/profile', [PostController::class, 'showProfile'])->name('profile')->middleware('auth');
Route::post('/profile', [PostController::class, 'store'])->middleware('auth');

Route::post('/logout', action: [LogoutController::class, 'logout'])->name('logout')->middleware('auth');
Route::post('/destroy/{post}', [PostController::class, 'destroy'])->name('destroy')->middleware(middleware: 'auth');
Route::post('/update/{post}', action: [PostController::class, 'update'])->name('posts.update');


Route::middleware(['auth'])->group(function () {
    Route::get('/', [HomeController::class, 'index'])->name('home')->middleware('auth');
});

Route::middleware(['auth'])->group(function () {
    Route::get('/home', [HomeController::class, 'index'])->name('home')->middleware('auth');
});

Route::get('/chat/{postId}', [MessageController::class, 'showChatPage'])->name('chat')->middleware('auth');
Route::post('/chat/send', [MessageController::class, 'submitMessage'])->name('chat.send')->middleware('auth');



