<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Chat;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class PostMessagesController extends Controller
{
    public function showMessages()
    {
        // Retrieve chats linked to posts by the authenticated user (seller)
        $chats = Chat::whereIn('post_id', Auth::user()->posts->pluck('id'))->get();
    
        return Inertia::render("PostMessages", [
            'chats' => $chats,
        ]);
    }

    public function addLink(Request $request, $authName, $posterName, $postId)
    {
        $validatedRequest = $request->validate([
            'post_link' => 'required|string',
        ]);

        $userId = Auth::id();

        // Store the chat record
        $chat = Chat::create([
            'post_id' => $postId,
            'user_id' => $userId,
            'post_link' => $validatedRequest['post_link'],
        ]);

        return Inertia::render('PostMessages', [
            'chat' => $chat,
            'post_link' => $validatedRequest['post_link']
        ]);
    }
}