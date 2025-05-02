<?php

use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\ProductController;
use App\Http\Controllers\API\OrderController;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;

// Test route
Route::get('/test', function (Request $request) {
    return response()->json(['message' => 'API is working!']);
});

// GET test routes for browser testing
Route::get('/register-test', function() {
    return response()->json(['message' => 'This is the register endpoint. Use POST with axios for actual registration.']);
});

Route::get('/login-test', function() {
    return response()->json(['message' => 'This is the login endpoint. Use POST with axios for actual login.']);
});

// Browser-friendly GET test routes - these are safe to access directly
Route::get('/register-info', function() {
    return response()->json([
        'message' => 'This is the register endpoint information',
        'usage' => [
            'method' => 'POST',
            'url' => 'http://localhost:8000/api/register',
            'required_fields' => [
                'username', 'password', 'full_name', 'address', 
                'contact_number', 'email_address'
            ],
            'note' => 'This endpoint only supports POST requests. Use a tool like Postman or your React frontend to test.'
        ]
    ]);
});

Route::get('/login-info', function() {
    return response()->json([
        'message' => 'This is the login endpoint information',
        'usage' => [
            'method' => 'POST',
            'url' => 'http://localhost:8000/api/login',
            'required_fields' => ['username', 'password'],
            'note' => 'This endpoint only supports POST requests. Use a tool like Postman or your React frontend to test.'
        ]
    ]);
});

Route::get('/orders-info', function() {
    return response()->json([
        'message' => 'This is the orders endpoint information',
        'usage' => [
            'method' => 'POST',
            'url' => 'http://localhost:8000/api/orders',
            'required_fields' => ['user_id', 'products', 'total'],
            'authentication' => 'Requires Bearer token in Authorization header',
            'note' => 'This endpoint only supports POST requests. Use a tool like Postman or your React frontend to test.'
        ]
    ]);
});

// Public routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::get('/products', [ProductController::class, 'index']);
Route::get('/products/{id}', [ProductController::class, 'show']);

// Protected routes
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/orders', [OrderController::class, 'store']);
});
