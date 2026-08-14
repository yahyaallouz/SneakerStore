<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;

class ProductController extends Controller
{
    public function index()
    {
        return response()->json(Product::orderBy('created_at', 'desc')->get());
    }

    public function store(Request $request)
    {
        $images = [];
        $imageUrl = null;

        if ($request->hasFile('images')) {
            $files = $request->file('images');
            if (!is_array($files)) {
                $files = [$files];
            }
            foreach ($files as $index => $file) {
                $filename = time() . '_' . $index . '_' . uniqid() . '.' . $file->getClientOriginalExtension();
                $file->move(public_path('uploads'), $filename);
                $images[] = '/uploads/' . $filename;
            }
        } elseif ($request->hasFile('image')) {
            $file = $request->file('image');
            $filename = time() . '_' . uniqid() . '.' . $file->getClientOriginalExtension();
            $file->move(public_path('uploads'), $filename);
            $images[] = '/uploads/' . $filename;
        }

        if (count($images) > 0) {
            $imageUrl = $images[0];
        }

        $sizes = $request->input('sizes');
        if (is_string($sizes)) {
            $sizes = json_decode($sizes, true) ?? [];
        }

        $product = Product::create([
            'name' => $request->input('name'),
            'brand' => $request->input('brand'),
            'price' => $request->input('price', 0),
            'category' => $request->input('category', 'men'),
            'description' => $request->input('description'),
            'image_url' => $imageUrl,
            'images' => $images,
            'sizes' => $sizes ?? [],
        ]);

        return response()->json($product, 201);
    }

    public function update(Request $request, $id)
    {
        $product = Product::findOrFail($id);

        // Parse existing_images array sent by front-end
        $existingImages = $request->input('existing_images');
        if (is_string($existingImages)) {
            $existingImages = json_decode($existingImages, true) ?? [];
        } elseif (!is_array($existingImages)) {
            $existingImages = [];
        }

        // Get images to delete
        $currentImages = is_array($product->images) ? $product->images : [];
        if ($product->image_url) {
            $currentImages[] = $product->image_url;
        }
        $currentImages = array_values(array_unique($currentImages));
        $imagesToDelete = array_diff($currentImages, $existingImages);

        foreach ($imagesToDelete as $oldImage) {
            if (File::exists(public_path($oldImage))) {
                File::delete(public_path($oldImage));
            }
        }

        // Handle new file uploads
        $newImages = [];
        if ($request->hasFile('images')) {
            $files = $request->file('images');
            if (!is_array($files)) {
                $files = [$files];
            }
            foreach ($files as $index => $file) {
                $filename = time() . '_' . $index . '_' . uniqid() . '.' . $file->getClientOriginalExtension();
                $file->move(public_path('uploads'), $filename);
                $newImages[] = '/uploads/' . $filename;
            }
        } elseif ($request->hasFile('image')) {
            $file = $request->file('image');
            $filename = time() . '_' . uniqid() . '.' . $file->getClientOriginalExtension();
            $file->move(public_path('uploads'), $filename);
            $newImages[] = '/uploads/' . $filename;
        }

        $mergedImages = array_merge($existingImages, $newImages);
        $imageUrl = count($mergedImages) > 0 ? $mergedImages[0] : null;

        $sizes = $request->input('sizes');
        if (is_string($sizes)) {
            $sizes = json_decode($sizes, true) ?? [];
        }

        $product->update([
            'name' => $request->input('name') ?? $product->name,
            'brand' => $request->input('brand') ?? $product->brand,
            'price' => $request->input('price') ?? $product->price,
            'category' => $request->input('category') ?? $product->category,
            'description' => $request->input('description') ?? $product->description,
            'image_url' => $imageUrl,
            'images' => $mergedImages,
            'sizes' => $sizes ?? $product->sizes,
        ]);

        return response()->json([
            'message' => 'Product updated',
            'imageUrl' => $imageUrl,
            'images' => $mergedImages
        ]);
    }

    public function destroy($id)
    {
        $product = Product::findOrFail($id);
        $currentImages = is_array($product->images) ? $product->images : [];
        if ($product->image_url) {
            $currentImages[] = $product->image_url;
        }
        $currentImages = array_values(array_unique($currentImages));

        foreach ($currentImages as $image) {
            if (File::exists(public_path($image))) {
                File::delete(public_path($image));
            }
        }
        $product->delete();

        return response()->json(['message' => 'Product deleted']);
    }
}
