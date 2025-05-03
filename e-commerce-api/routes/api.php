<?php

use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\CategoryController;
use App\Http\Controllers\API\ProductController;
use App\Http\Controllers\API\OrderController;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;

// Test route
Route::get('/test', function (Request $request) {
    return response()->json(['message' => 'API is working!']);
});

// Public routes
// Auth routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Product routes - specific routes first, then parameter routes
Route::get('/products/new-arrivals', [ProductController::class, 'newArrivals']);
Route::get('/products/featured', [ProductController::class, 'featured']);
Route::get('/products', [ProductController::class, 'index']);
Route::get('/products/{id}', [ProductController::class, 'show']);

// Category routes
Route::get('/categories', [CategoryController::class, 'index']);
Route::get('/categories/{id}/products', [CategoryController::class, 'products']);
Route::get('/categories/{id}', [CategoryController::class, 'show']);

// Protected routes
Route::middleware('auth:sanctum')->group(function () {
    // User routes
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    
    // Order routes
    Route::post('/orders', [OrderController::class, 'store']);
    Route::get('/orders', [OrderController::class, 'index']);
    Route::get('/orders/{id}', [OrderController::class, 'show']);
});
