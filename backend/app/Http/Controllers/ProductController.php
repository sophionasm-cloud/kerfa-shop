<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{
    // 1. Load all products to show in the list
    public function index()
    {
        return response()->json(DB::table('products')->orderBy('id', 'desc')->get());
    }

    // 2. Create a New Product with an Image, Category, and Stock
    public function store(Request $request)
{
    try {
        $request->validate([
            'name'        => 'required|string',
            'price'       => 'required|numeric',
            'description' => 'nullable|string',
            'category'    => 'nullable|string',
            'stock'       => 'nullable|integer',
            'featured'    => 'nullable|integer',
            'image'       => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048'
        ]);

        $imagePath = null;

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('products', 'public');
            $imagePath = 'storage/' . $path;
        }

        $id = DB::table('products')->insertGetId([
            'name'        => $request->name,
            'price'       => $request->price,
            'description' => $request->description,
            'category'    => $request->category ?? 'general',
            'stock'       => $request->stock ?? 0,
            'featured'    => $request->featured ?? 1,
            'image'       => $imagePath, 
            'created_at'  => now(),
            'updated_at'  => now(),
        ]);

        return response()->json([
            'message' => 'Product created successfully!',
            'product' => DB::table('products')->where('id', $id)->first()
        ], 201);
        
    } catch (\Exception $e) {
        return response()->json([
            'message' => 'Error creating product',
            'error' => $e->getMessage()
        ], 500);
    }
}
    // 3. Update an Existing Product with a New Image
    public function update(Request $request, $id)
    {
        $request->validate([
            'name'        => 'required|string',
            'price'       => 'required|numeric',
            'description' => 'nullable|string',
            'category'    => 'nullable|string',
            'stock'       => 'nullable|integer',
            'featured'    => 'nullable|integer',
            'image'       => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048'
        ]);

        $product = DB::table('products')->where('id', $id)->first();
        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }

        $imagePath = $product->image; 

        if ($request->hasFile('image')) {
            if ($product->image) {
                $oldPath = str_replace('storage/', '', $product->image);
                Storage::disk('public')->delete($oldPath);
            }

            $path = $request->file('image')->store('products', 'public');
            $imagePath = 'storage/' . $path;
        }

        DB::table('products')->where('id', $id)->update([
            'name'        => $request->name,
            'price'       => $request->price,
            'description' => $request->description,
            'category'    => $request->category,
            'stock'       => $request->stock,
            'featured'    => $request->featured ?? 1,
            'image'       => $imagePath,
            'updated_at'  => now(),
        ]);

        return response()->json([
            'message' => 'Product updated successfully!'
        ]);
    }

    // 4. Delete a Product
    public function destroy($id)
    {
        $product = DB::table('products')->where('id', $id)->first();
        if ($product && $product->image) {
            $oldPath = str_replace('storage/', '', $product->image);
            Storage::disk('public')->delete($oldPath);
        }

        DB::table('products')->where('id', $id)->delete();
        return response()->json(['message' => 'Product deleted successfully!']);
    }
}