import { router, usePage } from "@inertiajs/react";

export default function PostMessages() {
    const { chats } = usePage().props;

    function gotochat(link) {
        router.visit(link);
    }

    return (
        <div className="p-4">
            {chats.length === 0 ? (
                <p>No chats available.</p>
            ) : (
                <ul>
                    {chats.map(chat => (
                        <li
                            key={chat.id}
                            className="hover:cursor-pointer hover:text-blue-600 hover:underline"
                            onClick={() => gotochat(chat.post_link)}
                        >
                            {chat.post_link}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

