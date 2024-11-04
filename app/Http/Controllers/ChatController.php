<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Chat;
use App\Models\Message;
use App\Events\MessageSent;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ChatController extends Controller
{
    public function showChatPage($authName, $posterName, $postId)
{
    // Retrieve chats for the user, based on the postId, etc.
    $chats = Chat::where('post_id', $postId)->get();

    // Return the view or Inertia component
    return inertia('Chat', [
        'chats' => $chats,
        'postId' => $postId,
        'authUser' => Auth::user(),
    ]);
}

    public function sendMessage(Request $request)
    {
        $request->validate([
            'message' => 'required|string',
            'postId' => 'required|integer',
        ]);

        $message = Message::create([
            'message' => $request->message,
            'post_id' => $request->postId,
            'user_id' => Auth::id(),
        ]);

        broadcast(new MessageSent($message))->toOthers();

        return response()->json($message);
    }

    public function showUserChats()
    {
        $authUserId = Auth::id();

        $userChats = Chat::where('user_id', $authUserId)
            ->orWhere('post_user_id', $authUserId)
            ->select('id', 'post_link', 'post_id', 'user_id', 'post_user_id')
            ->get();

        return Inertia::render("UserChats", [
            'chats' => $userChats,
            'authUser' => Auth::user(),
        ]);
    }
}
