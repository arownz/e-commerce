<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        //TEST DATA FOR PRODUCTS to see if it will show in react
        $products = [
            [
                'category_id' => 1,
                'name' => 'Smartphone',
                'description' => 'Latest model with high-end features',
                'price' => 599.99,
                'stock_quantity' => 50,
                'image_url' => 'https://th.bing.com/th/id/R.de59b2f20d94dba01492b6a6482c5487?rik=z1vY9Pcf7j3z1w&riu=http%3a%2f%2fpngimg.com%2fuploads%2fsmartphone%2fsmartphone_PNG8501.png&ehk=BVMFvlXC%2fScPW08i%2fWrPMCqpkEFPz3ny64t5QQNBMc0%3d&risl=&pid=ImgRaw&r=0',
                'is_available' => true
            ],
            [
                'category_id' => 1,
                'name' => 'Laptop',
                'description' => 'Powerful laptop for work and gaming',
                'price' => 999.99,
                'stock_quantity' => 30,
                'image_url' => 'https://th.bing.com/th/id/OIP.O2WO3AHeQ_TBxIKJq5D_qAHaG9?rs=1&pid=ImgDetMain',
                'is_available' => true
            ],
            [
                'category_id' => 2,
                'name' => 'T-Shirt',
                'description' => 'Comfortable cotton t-shirt',
                'price' => 19.99,
                'stock_quantity' => 100,
                'image_url' => 'https://th.bing.com/th/id/OIP.tWvFapCDGZSuSmoZAhahigHaHa?rs=1&pid=ImgDetMain',
                'is_available' => true
            ],
            [
                'category_id' => 3,
                'name' => 'Coffee Maker',
                'description' => 'Automatic coffee maker with timer',
                'price' => 49.99,
                'stock_quantity' => 25,
                'image_url' => 'https://i5.walmartimages.com/asr/16f77040-27ab-4008-9852-59c900d7a7d9_1.c524f1d9c465e122596bf65f939c8d26.jpeg',
                'is_available' => true
            ],
        ];

        foreach ($products as $product) {
            Product::create($product);
        }
    }
}
