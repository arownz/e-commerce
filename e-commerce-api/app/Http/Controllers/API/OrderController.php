<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
    /**
     * Place a new order.
     */
    public function store(Request $request)
    {
        // Validate the request
        $request->validate([
            'user_id' => 'required|exists:users_tb,user_id',
            'products' => 'required|array',
            'products.*.id' => 'required|exists:products,id',
            'products.*.quantity' => 'required|integer|min:1',
            'total' => 'required|numeric',
        ]);

        try {
            DB::beginTransaction();
            
            // Create the order
            $order = Order::create([
                'user_id' => $request->user_id,
                'total_amount' => $request->total,
                'shipping_address' => $request->input('shipping_address', $request->user()->address),
                'status' => 'pending',
            ]);
            
            // Create order items and update inventory
            foreach ($request->products as $item) {
                $product = Product::findOrFail($item['id']);
                
                // Check if enough stock is available
                if ($product->stock_quantity < $item['quantity']) {
                    DB::rollBack();
                    return response()->json([
                        'success' => false,
                        'message' => "Not enough stock available for {$product->name}",
                    ], 400);
                }
                
                // Create order item
                OrderItem::create([
                    'order_id' => $order->id,
                    'product_id' => $item['id'],
                    'quantity' => $item['quantity'],
                    'price' => $product->price,
                ]);
                
                // Update inventory
                $product->stock_quantity -= $item['quantity'];
                $product->save();
            }
            
            DB::commit();
            
            return response()->json([
                'success' => true,
                'message' => 'Order placed successfully',
                'order_id' => $order->id
            ]);
            
        } catch (\Exception $e) {
            DB::rollBack();
            
            return response()->json([
                'success' => false,
                'message' => 'Failed to place order',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
