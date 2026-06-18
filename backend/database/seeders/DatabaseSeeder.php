<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Product;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        Product::create([
            'name' => 'Yirgacheffe Coffee',
            'description' => 'Premium Ethiopian Arabica coffee.',
            'price' => 1200,
            'category' => 'Premium Quality',
            'image' => 'yirgacheffe.jpg',
            'stock' => 50,
            'featured' => true,
        ]);

        Product::create([
            'name' => 'Sidamo Export Package',
            'description' => 'Export-grade Ethiopian coffee package.',
            'price' => 5000,
            'category' => 'Global Export',
            'image' => 'sidamo.jpg',
            'stock' => 20,
            'featured' => true,
        ]);

        Product::create([
            'name' => 'Local Market Blend',
            'description' => 'Coffee blend for local Ethiopian markets.',
            'price' => 800,
            'category' => 'Local Market',
            'image' => 'local-blend.jpg',
            'stock' => 100,
            'featured' => false,
        ]);
    }
}
