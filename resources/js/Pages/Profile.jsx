import { useForm, usePage } from "@inertiajs/react";
import { useState } from "react";

export default function Profile() {
    const { auth, posts } = usePage().props;
    const [editingPost, setEditingPost] = useState(null);

    const { post, data, setData, errors, reset } = useForm({
        title: '',
        description: '',
        price: '',
        image: null,
    });

    const [imagePreview, setImagePreview] = useState(null);

    // Function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        const url = editingPost ? `/update/${editingPost.id}` : '/profile';
        post(url, { onFinish: resetForm });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImagePreview(URL.createObjectURL(file));
            setData('image', file);
        }
    };

    // Function to handle post delete
    const handleDelete = (postId) => {
        post(`/destroy/${postId}`, {
            onFinish: () => console.log('Post deleted successfully'),
        });
    };

    // Function to handle post update (loads post data into form)
    const handleUpdate = (post) => {
        setEditingPost(post);
        setData({
            title: post.title,
            description: post.description,
            price: post.price,
            image: null,
        });
        setImagePreview(`/storage/${post.image_path}`);
    };

    // Reset form after submission
    const resetForm = () => {
        reset();
        setImagePreview(null);
        setEditingPost(null);
    };

    return (
        <>
            <div className="flex flex-col lg:flex-row gap-6 p-6">
                {/* User Info Section */}
                <div className="lg:w-1/3 bg-gray-100 p-4 rounded-lg shadow-md">
                    <h2 className="text-xl font-bold mb-4">User Information</h2>
                    <p><strong>Name:</strong> {auth.user.name}</p>
                    <p><strong>Email:</strong> {auth.user.email}</p>
                    <p><strong>Joined:</strong> {new Date(auth.user.created_at).toLocaleDateString()}</p>
                </div>

                {/* Create or Edit Post Section */}
                <div className="lg:w-2/3 bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-bold mb-4">{editingPost ? 'Update Post' : 'Create a New Post'}</h2>
                    <p className="error">You have to fill everything before creating a post !</p>
                    <form onSubmit={handleSubmit}>
                        {/* Title */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700" htmlFor="title">Title</label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                value={data.title}
                                className="mt-1 p-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                onChange={e => setData('title', e.target.value)}
                            />
                            {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
                        </div>

                        {/* Description */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700" htmlFor="description">Description</label>
                            <textarea
                                id="description"
                                name="description"
                                value={data.description}
                                className="mt-1 p-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                rows="4"
                                onChange={e => setData('description', e.target.value)}
                            />
                            {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
                        </div>

                        {/* Price */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700" htmlFor="price">Price</label>
                            <input
                                type="number"
                                id="price"
                                name="price"
                                value={data.price}
                                className="mt-1 p-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                onChange={e => setData('price', e.target.value)}
                            />
                            {errors.price && <p className="text-red-500 text-sm">{errors.price}</p>}
                        </div>

                        {/* Image Upload */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700" htmlFor="image">Upload Picture</label>
                            <input
                                type="file"
                                id="image"
                                name="image"
                                className="mt-1 block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
                                onChange={handleImageChange}
                            />
                            {imagePreview && <img src={imagePreview} alt="Preview" className="mt-2 h-24 w-24 object-cover rounded-lg" />}
                            {errors.image && <p className="text-red-500 text-sm">{errors.image}</p>}
                        </div>

                        {/* Submit Button */}
                        <button type="submit" className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600">
                            {editingPost ? 'Update Post' : 'Create Post'}
                        </button>
                    </form>
                </div>
            </div>

            <div className="container mx-auto p-6">
                {/* Posts Section */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold mb-6">Posts</h2>
                    {posts.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {posts
                                .filter(post => post.user.name === auth.user.name)
                                .map(post => (
                                    <div key={post.id} className="bg-white rounded-lg overflow-hidden shadow-md flex flex-col justify-between">
                                        {/* Post image */}
                                        {post.image_path && (
                                            <img
                                                src={`/storage/${post.image_path}`}
                                                alt={post.title}
                                                className="h-48 w-full object-cover"
                                            />
                                        )}
                                        {/* Post details */}
                                        <div className="p-4 flex-grow">
                                            <h3 className="text-lg font-semibold">{post.title}</h3>
                                            <p className="text-sm text-gray-600 line-clamp-3">{post.description}</p>
                                            <p className="text-sm text-gray-800 font-bold">Price: ${post.price}</p>
                                            <p className="text-sm text-gray-600">Posted on: {new Date(post.created_at).toLocaleDateString()}</p>
                                            <p className="text-sm text-gray-600">by {post.user?.name}</p>
                                        </div>
                                        <div className="text-right mt-auto p-2">
                                            <button onClick={() => handleDelete(post.id)} className="delete-btn">Delete</button>
                                            <button onClick={() => handleUpdate(post)} className="update-btn">Update</button>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    ) : (
                        <p>No posts found.</p>
                    )}
                </div>
            </div>
        </>
    );
}
