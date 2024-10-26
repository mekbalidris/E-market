import React from 'react';
import { usePage, router } from '@inertiajs/react';

export default function Home() {
    const { auth, posts } = usePage().props;

    function handleMessage(postrev) {
        if (postrev?.id) {
            router.visit(`/chat/${postrev.id}`);
        }
    }

    return (
        <div className="container mx-auto p-6">
            {/* Posts Section */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-6">Posts</h2>
                {/* Display the list of posts in a responsive grid */}
                {posts?.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {posts.map(post => (
                            <div key={post.id} className="bg-white rounded-lg overflow-hidden shadow-md">
                                {/* Post image */}
                                {post.image_path && (
                                    <img
                                        src={`/storage/${post.image_path}`}
                                        alt={post.title}
                                        className="h-48 w-full object-cover"
                                    />
                                )}
                                {/* Post details */}
                                <div className="p-4">
                                    <h3 className="text-lg font-semibold">{post.title}</h3>
                                    <p className="text-sm text-gray-600 line-clamp-3">{post.description}</p>
                                    <p className="text-sm text-gray-800 font-bold">Price: ${post.price}</p>
                                    <p className="text-sm text-gray-600">Posted on: {new Date(post.created_at).toLocaleDateString()}</p>
                                    <p className="text-sm text-gray-600">by {post.user?.name}</p>
                                </div>
                                {auth.user?.name !== post.user?.name && (
                                    <div className="text-right mt-auto p-2">
                                        <button onClick={() => handleMessage(post)} className="message-btn">Message</button>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No posts found.</p>
                )}
            </div>
        </div>
    );
}
