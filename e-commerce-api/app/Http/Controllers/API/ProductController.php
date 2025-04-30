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
        $products = Product::where('is_available', true)
                    ->where('stock_quantity', '>', 0)
                    ->with('category')
                    ->get();

        return response()->json($products);
    }

    /**
     * Get product details.
     */
    public function show($id)
    {
        $product = Product::with('category')->find($id);
        
        if (!$product) {
            return response()->json([
                'success' => false,
                'message' => 'Product not found'
            ], 404);
        }
        
        return response()->json($product);
    }
}
