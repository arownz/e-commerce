<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        $products = [
            [
                'category_id' => 1,
                'name' => 'Smartphone',
                'description' => 'Latest model with high-end features',
                'price' => 599.99,
                'stock_quantity' => 50,
                'image_url' => 'https://via.placeholder.com/200',
                'is_available' => true
            ],
            [
                'category_id' => 1,
                'name' => 'Laptop',
                'description' => 'Powerful laptop for work and gaming',
                'price' => 999.99,
                'stock_quantity' => 30,
                'image_url' => 'https://via.placeholder.com/200',
                'is_available' => true
            ],
            [
                'category_id' => 2,
                'name' => 'T-Shirt',
                'description' => 'Comfortable cotton t-shirt',
                'price' => 19.99,
                'stock_quantity' => 100,
                'image_url' => 'https://via.placeholder.com/200',
                'is_available' => true
            ],
            [
                'category_id' => 3,
                'name' => 'Coffee Maker',
                'description' => 'Automatic coffee maker with timer',
                'price' => 49.99,
                'stock_quantity' => 25,
                'image_url' => 'https://via.placeholder.com/200',
                'is_available' => true
            ],
        ];

        foreach ($products as $product) {
            Product::create($product);
        }
    }
}
