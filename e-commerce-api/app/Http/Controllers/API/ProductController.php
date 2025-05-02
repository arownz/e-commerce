<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    /**
     * Get all products.
     */
    public function index()
    {
        // Simple array for testing if the route works
        return response()->json([
            'success' => true,
            'message' => 'Products retrieved successfully',
            'data' => [
                ['id' => 1, 'name' => 'Test Product 1', 'price' => 99.99, 'description' => 'Test product description', 'image_url' => null, 'stock_quantity' => 10],
                ['id' => 2, 'name' => 'Test Product 2', 'price' => 149.99, 'description' => 'Another test product', 'image_url' => null, 'stock_quantity' => 5],
            ]
        ]);
    }

    /**
     * Get product details.
     */
    public function show($id)
    {
        return response()->json([
            'success' => true,
            'message' => 'Product retrieved successfully',
            'data' => [
                'id' => $id,
                'name' => 'Test Product',
                'price' => 99.99,
                'description' => 'This is a test product',
                'image_url' => null,
                'stock_quantity' => 10
            ]
        ]);
    }
}
