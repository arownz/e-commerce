<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log;

class AuthController extends Controller
{
    /**
     * Register a new user.
     */
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'username' => 'required|string|unique:users_tb',
            'password' => 'required|string|min:6',
            'full_name' => 'required|string',
            'address' => 'required|string',
            'contact_number' => 'required|string',
            'email_address' => 'required|email|unique:users_tb',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => $validator->errors(),
            ], 400);
        }

        $user = User::create([
            'username' => $request->username,
            'password' => Hash::make($request->password),
            'full_name' => $request->full_name,
            'address' => $request->address,
            'contact_number' => $request->contact_number,
            'email_address' => $request->email_address,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'User registered successfully',
            'user' => $user
        ]);
    }

    /**
     * Login user and create token.
     */
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'username' => 'required|string',
            'password' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => $validator->errors(),
            ], 400);
        }

        try {
            // Check username
            $user = User::where('username', $request->username)->first();

            // Log attempt for debugging
            Log::info('Login attempt', [
                'username' => $request->username,
                'user_found' => !is_null($user),
            ]);

            // Check password
            if (!$user || !Hash::check($request->password, $user->password)) {
                return response()->json([
                    'success' => false,
                    'message' => 'Invalid credentials',
                ], 401);
            }

            // Create token safely
            try {
                $token = $user->createToken('auth_token')->plainTextToken;
            } catch (\Exception $e) {
                Log::error('Token creation error', [
                    'user_id' => $user->user_id,
                    'error' => $e->getMessage(),
                ]);
                
                return response()->json([
                    'success' => false,
                    'message' => 'Authentication system error. Please contact support.',
                ], 500);
            }

            return response()->json([
                'success' => true,
                'message' => 'Login successful',
                'user' => $user,
                'token' => $token,
            ]);
        } catch (\Exception $e) {
            Log::error('Login error', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            
            return response()->json([
                'success' => false,
                'message' => 'Server error during authentication.',
                'debug' => config('app.debug') ? $e->getMessage() : null
            ], 500);
        }
    }
}
