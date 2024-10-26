import React, { useState, useEffect } from 'react';
import { usePage } from '@inertiajs/react';
import axios from 'axios';
import Echo from "laravel-echo";
import Pusher from "pusher-js";

window.Pusher = Pusher;

export default function Chat() {
    const { authUser, postId } = usePage().props;
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        // Listen for incoming messages
        const echo = new Echo({
            broadcaster: 'pusher',
            key:  import.meta.env.VITE_PUSHER_APP_KEY,
            cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER,
            forceTLS: true
        });

        echo.channel(`chat.${postId}`).listen('MessageSent', (event) => {
            setMessages((messages) => [...messages, event.message]);
        });

        return () => echo.disconnect();
    }, [postId]);

    const handleSendMessage = async (e) => {
        e.preventDefault();

        if (!message.trim()) return;

        const response = await axios.post('/chat/send', { message, postId });
        
        if (response.data) {
            setMessages([...messages, response.data]);
            setMessage('');
        }
    };

    return (
        <div className="flex flex-col h-screen bg-gray-100">
            <div className="py-4 px-6 bg-blue-600 text-white text-xl font-semibold shadow-md">Chat Room</div>

            <div id="messages-container" className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg, index) => (
                    <div key={index} className={`flex ${msg.user_id === authUser.id ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-xs px-4 py-2 rounded-lg shadow ${msg.user_id === authUser.id ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-900'}`}>
                            <p>{msg.message}</p>
                        </div>
                    </div>
                ))}
            </div>

            <form onSubmit={handleSendMessage} className="flex items-center p-4 border-t border-gray-300 bg-white">
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
                />
                <button
                    type="submit"
                    className="ml-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none"
                >
                    Send
                </button>
            </form>
        </div>
    );
}
