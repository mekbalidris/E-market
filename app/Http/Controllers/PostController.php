<?php
namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class PostController extends Controller
{
    // Show the profile page with the user's posts and username
    public function showProfile()
    {
        if(Auth::check()){
        
            $posts = Post::with('user')->orderBy("created_at", "desc")->get();

        return Inertia::render('Profile', [
            'auth' => [
                'user' => Auth::user(),
            ],
            'posts' => $posts,
        ]);}
        else{
            return Inertia::render('Profile');
        }
    }

    // Handle the creation of a new post
    public function store(Request $request)
{
    // Validate the incoming request data
    $validated = $request->validate([
        'title' => 'required|string|max:100',
        'description' => 'required|string',
        'price' => 'required|numeric',
        'image' => 'required|file|image|mimes:jpeg,png,jpg|max:2048',
    ]);

    // Store the uploaded image in the 'public/images' folder
    $path = $request->file('image')->store('images', 'public');

    // Create a new post with the validated data and store it in the database
    $post = Post::create([
        'title' => $validated['title'],
        'description' => $validated['description'],
        'price' => $validated['price'],
        'image_path' => $path, // Store the image path in the database
        'user_id' => Auth::id(), // Associate the post with the authenticated user
    ]);

    // Redirect back with a success message
    return redirect()->back()->with('success', 'Post created successfully');
}

    public function update(Request $request, Post $post){
        if ($post->user_id === Auth::id()) {

        $validated = $request->validate([
            'title' => 'sometimes|required|string|max:100',
            'description' => 'sometimes|required|string',
            'price' => 'sometimes|required|numeric',
            'image' => 'nullable|file|image|mimes:jpeg,png,jpg|max:2048',
        ]);

        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('images', 'public'); // Save the image in the 'images' directory
            $validated['image_path'] = $imagePath; // Store the image path
        }

        $post->update(array_merge(
            $validated,
            [
                'title' => $validated['title'] ?? $post->title,
                'description' => $validated['description'] ?? $post->description,
                'price' => $validated['price'] ?? $post->price,
            ]
        ));

        $post->update($validated);

        return redirect()->back()->with('success', 'Post updated successfully!');
    }

        return redirect()->back()->with('error', 'Unauthorized to update this post.');
    }

    public function destroy(Post $post){
        if ($post->user_id === Auth::id()) { 

            $post->delete();
            return redirect()->back()->with('success', 'Post deleted successfully');
        } else {
            return redirect()->back()->with('error', 'Unauthorized to delete this post');
        }
    }
}
