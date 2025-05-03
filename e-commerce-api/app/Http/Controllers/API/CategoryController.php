<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    /**
     * Get all categories.
     */
    public function index()
    {
        try {
            // Get all categories with product count
            $categories = Category::withCount('products')->get();
            
            return response()->json([
                'success' => true,
                'message' => 'Categories retrieved successfully',
                'data' => $categories
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve categories',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get a specific category.
     */
    public function show($id)
    {
        try {
            $category = Category::withCount('products')->findOrFail($id);
            
            return response()->json([
                'success' => true,
                'message' => 'Category retrieved successfully',
                'data' => $category
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Category not found',
                'error' => $e->getMessage()
            ], 404);
        }
    }

    /**
     * Get products by category ID.
     */
    public function products($id)
    {
        try {
            $category = Category::findOrFail($id);
            $products = Product::where('category_id', $id)
                ->where('is_available', true)
                ->with('category')
                ->get();
            
            return response()->json([
                'success' => true,
                'message' => 'Category products retrieved successfully',
                'category' => $category,
                'products' => $products
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve category products',
                'error' => $e->getMessage()
            ], $e instanceof \Illuminate\Database\Eloquent\ModelNotFoundException ? 404 : 500);
        }
    }
}
