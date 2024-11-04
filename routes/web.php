<?php

use App\Http\Controllers\Auth\HomeController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\LogoutController;
use App\Http\Controllers\Auth\PostMessagesController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\ChatController;
use App\Http\Controllers\PostController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MessageController;

Route::get('/login', [LoginController::class, 'showLoginPage'])->name('login')->middleware('guest');
Route::post('/login', [LoginController::class, 'login'])->middleware('guest');

Route::get('/register',[RegisterController::class, 'showRgisterPage'])->name('register')->middleware('guest');;
Route::post('/register', [RegisterController::class, 'register'])->middleware('guest');

Route::get('/profile', [PostController::class, 'showProfile'])->name('profile')->middleware('auth');
Route::post('/profile', [PostController::class, 'store'])->middleware('auth');

Route::post('/logout', [LogoutController::class, 'logout'])->name('logout')->middleware('auth');
Route::post('/destroy/{post}', [PostController::class, 'destroy'])->name('destroy')->middleware(middleware: 'auth');
Route::post('/update/{post}',  [PostController::class, 'update'])->name('posts.update');


Route::middleware(['auth'])->group(function () {
    Route::get('/', [HomeController::class, 'index'])->name('home')->middleware('auth');
});

Route::middleware(['auth'])->group(function () {
    Route::get('/home', [HomeController::class, 'index'])->name('home')->middleware('auth');
});


Route::middleware(['auth'])->group(function () {
    Route::get('/user-chats', [ChatController::class, 'showUserChats'])->name('userChats');
    Route::get('/chat/{posterName}/{authName}/{postId}', [ChatController::class, 'showChatPage'])->name('chat');
    Route::post('/chat/{posterName}/{authName}/{postId}', [PostMessagesController::class, 'addLink']);
    Route::get('/postmessages/{postId}', [PostMessagesController::class, 'showMessages'])->name('postChats');
    Route::post('/chat/send', [ChatController::class, 'sendMessage'])->name('chat_send');
});


