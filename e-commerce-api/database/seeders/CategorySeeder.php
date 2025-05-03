<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            [
                'name' => 'Electronics',
                'description' => 'Electronic devices and gadgets',
                'image_url' => 'https://i.imgur.com/jJQjEGM.jpg'
            ],
            [
                'name' => 'Clothing',
                'description' => 'Apparel and fashion items',
                'image_url' => 'https://i.imgur.com/61ARdUS.jpg'
            ],
            [
                'name' => 'Home & Kitchen',
                'description' => 'Products for your home',
                'image_url' => 'https://i.imgur.com/WBTkRXG.jpg'
            ],
            [
                'name' => 'Sports',
                'description' => 'Health and fitness products',
                'image_url' => 'https://i.imgur.com/7TzNQDW.jpg'
            ],
        ];

        foreach ($categories as $category) {
            Category::create($category);
        }
    }
}
