<?php

namespace Database\Seeders;

use App\Models\Product;
use App\Models\Category;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        // Make sure categories exist before seeding products
        $categories = Category::all();
        if ($categories->isEmpty()) {
            // Call the category seeder first if no categories exist
            $this->call(CategorySeeder::class);
        }

        $products = [
            // Electronics
            [
                'category_id' => 1,
                'name' => 'Smartphone Pro X',
                'description' => 'Latest model with high-end features, 8GB RAM, 128GB storage, and 5G capability',
                'price' => 899.99,
                'stock_quantity' => 50,
                'image_url' => 'https://pricepony.co.id/blog/wp-content/uploads/2021/05/Samsung-Galaxy-A51-vs-1-1024x536.jpg',
                'is_available' => true
            ],
            [
                'category_id' => 1,
                'name' => 'Ultrabook Laptop',
                'description' => 'Thin and light laptop with powerful processor and long battery life',
                'price' => 1299.99,
                'stock_quantity' => 30,
                'image_url' => 'https://cdn.mos.cms.futurecdn.net/bXiQnGw7tFvBsEMtkqXKKE.jpg',
                'is_available' => true
            ],
            [
                'category_id' => 1,
                'name' => 'Wireless Earbuds',
                'description' => 'True wireless earbuds with noise cancellation and premium sound quality',
                'price' => 149.99,
                'stock_quantity' => 75,
                'image_url' => 'https://th.bing.com/th/id/OIP.rc_Usiax8UV38oEjhvC5dQHaHa?w=179&h=180&c=7&r=0&o=5&pid=1.7',
                'is_available' => true
            ],
            [
                'category_id' => 1,
                'name' => 'Smart Watch',
                'description' => 'Fitness and health tracking with smartphone notifications',
                'price' => 249.99,
                'stock_quantity' => 40,
                'image_url' => 'https://th.bing.com/th/id/OIP.z8FnZH-EdzeOPJLvW86V_QHaHa?w=192&h=192&c=7&r=0&o=5&pid=1.7',
                'is_available' => true
            ],
            
            // Clothing
            [
                'category_id' => 2,
                'name' => 'Premium Cotton T-Shirt',
                'description' => 'Comfortable 100% cotton t-shirt, perfect for everyday wear',
                'price' => 24.99,
                'stock_quantity' => 100,
                'image_url' => 'https://th.bing.com/th/id/OIP.pmS1NBXJRCgFa9aOcD8z4AAAAA?rs=1&pid=ImgDetMain',
                'is_available' => true
            ],
            [
                'category_id' => 2,
                'name' => 'Slim Fit Jeans',
                'description' => 'Classic blue denim with modern slim fit style',
                'price' => 59.99,
                'stock_quantity' => 80,
                'image_url' => 'https://i.ebayimg.com/images/g/kUkAAOSwTGBcsNao/s-l1600.jpg',
                'is_available' => true
            ],
            [
                'category_id' => 2,
                'name' => 'Winter Jacket',
                'description' => 'Warm and waterproof winter jacket with hood',
                'price' => 129.99,
                'stock_quantity' => 35,
                'image_url' => 'https://th.bing.com/th/id/OIP.6gl3u984DAJWM8-YQ9AwggHaHa?rs=1&pid=ImgDetMain',
                'is_available' => true
            ],
            [
                'category_id' => 2,
                'name' => 'Running Shoes',
                'description' => 'Lightweight and comfortable shoes for running and training',
                'price' => 89.99,
                'stock_quantity' => 45,
                'image_url' => 'https://sportruns.com/media/How-to-Choose-the-Right-Running-Shoes-for-Your-Foot-Type.jpg',
                'is_available' => true
            ],
            
            // Home & Kitchen
            [
                'category_id' => 3,
                'name' => 'Coffee Maker',
                'description' => 'Programmable coffee maker with timer and multiple brew settings',
                'price' => 79.99,
                'stock_quantity' => 25,
                'image_url' => 'https://th.bing.com/th/id/OIP.v7ORILVh4Fl0C88CzQDN9QHaHa?w=181&h=181&c=7&r=0&o=5&pid=1.7',
                'is_available' => true
            ],
            [
                'category_id' => 3,
                'name' => 'Stainless Steel Cookware Set',
                'description' => '10-piece kitchen cookware set with non-stick coating',
                'price' => 199.99,
                'stock_quantity' => 20,
                'image_url' => 'https://th.bing.com/th/id/OIP.uC3VIEN02ymOaoS0MVbu4gHaHa?w=200&h=200&c=7&r=0&o=5&pid=1.7',
                'is_available' => true
            ],
            [
                'category_id' => 3,
                'name' => 'Smart LED TV',
                'description' => '55-inch 4K Ultra HD Smart TV with built-in streaming apps',
                'price' => 549.99,
                'stock_quantity' => 15,
                'image_url' => 'https://th.bing.com/th/id/OIP.cAt5yayGsNv6NgUlRjohLwHaHa?w=179&h=180&c=7&r=0&o=5&pid=1.7',
                'is_available' => true
            ],
            [
                'category_id' => 3,
                'name' => 'Robot Vacuum Cleaner',
                'description' => 'Automated cleaning robot with mapping technology and app control',
                'price' => 299.99,
                'stock_quantity' => 18,
                'image_url' => 'https://th.bing.com/th/id/OIP.nWUYxye9xO_kfwhWDjHgLQHaEK?w=322&h=181&c=7&r=0&o=5&pid=1.7',
                'is_available' => true
            ],
            
            // Sports
            [
                'category_id' => 4,
                'name' => 'Yoga Mat',
                'description' => 'Non-slip yoga mat with carrying strap',
                'price' => 29.99,
                'stock_quantity' => 60,
                'image_url' => 'https://th.bing.com/th/id/OIP.FjZfl81fKalVkQM5ae_FHQHaHa?w=186&h=186&c=7&r=0&o=5&pid=1.7',
                'is_available' => true
            ],
            [
                'category_id' => 4,
                'name' => 'Adjustable Dumbbells',
                'description' => 'Space-saving adjustable weight dumbbells for home workouts',
                'price' => 179.99,
                'stock_quantity' => 25,
                'image_url' => 'https://th.bing.com/th/id/OIP.lgxDexS7JDZXoV3sx8RlFgHaEo?w=301&h=187&c=7&r=0&o=5&pid=1.7',
                'is_available' => true
            ],
            [
                'category_id' => 4,
                'name' => 'Fitness Tracker',
                'description' => 'Waterproof fitness band with heart rate monitor',
                'price' => 79.99,
                'stock_quantity' => 40,
                'image_url' => 'https://th.bing.com/th/id/OIP.y3PF_RKuh1S9cii7oCvZuAHaE7?w=256&h=180&c=7&r=0&o=5&pid=1.7',
                'is_available' => true
            ],
            [
                'category_id' => 4,
                'name' => 'Basketball',
                'description' => 'Official size and weight indoor/outdoor basketball',
                'price' => 34.99,
                'stock_quantity' => 30,
                'image_url' => 'https://th.bing.com/th/id/OIP.Dr1zdFQiMZZFch60-VUzdgHaHb?w=191&h=191&c=7&r=0&o=5&pid=1.7',
                'is_available' => true
            ],
        ];

        foreach ($products as $product) {
            Product::create($product);
        }
    }
}
