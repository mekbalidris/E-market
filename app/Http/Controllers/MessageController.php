<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Message;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Events\MessageSent;

class MessageController extends Controller
{
    public function showChatPage($postId)
    {
        return Inertia::render("Chat", [
            'postId' => $postId,
            'authUser' => Auth::user(),
        ]);
    }
    

public function submitMessage(Request $request)
{
    $validated = $request->validate([
        'message' => 'required|string',
        'postId' => 'required|integer',
    ]);

    $message = Message::create([
        'user_id' => Auth::id(),
        'post_id' => $validated['postId'],
        'message' => $validated['message'],
    ]);

    broadcast(new MessageSent($message))->toOthers();

    return response()->json($message);
}

}
