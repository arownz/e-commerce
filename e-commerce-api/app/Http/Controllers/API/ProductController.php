<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    /**
     * Get all products.
     */
    public function index()
    {
        try {
            // Fetch actual products from database with their category
            $products = Product::with('category')->where('is_available', true)->get();
            
            return response()->json([
                'success' => true,
                'message' => 'Products retrieved successfully',
                'data' => $products
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve products',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get product details.
     */
    public function show($id)
    {
        try {
            $product = Product::with('category')->findOrFail($id);
            
            return response()->json([
                'success' => true,
                'message' => 'Product retrieved successfully',
                'data' => $product
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Product not found',
                'error' => $e->getMessage()
            ], 404);
        }
    }
    
    /**
     * Get new arrivals (most recent products).
     */
    public function newArrivals()
    {
        try {
            // Get the 8 most recently added products
            $products = Product::with('category')
                ->where('is_available', true)
                ->orderBy('created_at', 'desc')
                ->take(8)
                ->get();
            
            return response()->json([
                'success' => true,
                'message' => 'New arrivals retrieved successfully',
                'data' => $products
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve new arrivals',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get featured products.
     */
    public function featured()
    {
        try {
            // In a real app, you might have a 'featured' flag or use most sold products
            // For now, we'll just return some random products
            $products = Product::with('category')
                ->where('is_available', true)
                ->inRandomOrder()
                ->take(8)
                ->get();
            
            return response()->json([
                'success' => true,
                'message' => 'Featured products retrieved successfully',
                'data' => $products
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve featured products',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
