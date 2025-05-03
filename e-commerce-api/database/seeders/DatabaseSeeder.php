<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Always seed categories first
        $this->call([
            CategorySeeder::class,
            ProductSeeder::class,
        ]);
    }
}
