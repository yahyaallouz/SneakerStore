<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Product;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\File;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // 1. Seed Admin User
        User::updateOrCreate(
            ['email' => 'admin@sneaker.com'],
            [
                'name' => 'Admin User',
                'password' => Hash::make('admin123'),
                'role' => 'admin',
            ]
        );

        // 2. Clone products and copy images
        $sourceDir = base_path('../src/assets/images');
        $targetDir = public_path('uploads');

        if (!File::exists($targetDir)) {
            File::makeDirectory($targetDir, 0755, true);
        }

        $products = [
            [
                'name' => 'Air Force 1',
                'brand' => 'Nike',
                'price' => 110,
                'category' => 'men',
                'imageFilename' => 'nike_af1.png',
                'description' => 'A classic white leather sneaker with a clean design. Timeless style.',
                'sizes' => [40, 41, 42, 43, 44, 45]
            ],
            [
                'name' => 'RS-X',
                'brand' => 'Puma',
                'price' => 120,
                'category' => 'men',
                'imageFilename' => 'puma.png',
                'description' => 'A modern, chunky sneaker with a bold black, white, and red colorway.',
                'sizes' => [41, 42, 43, 44, 45]
            ],
            [
                'name' => 'Stan Smith',
                'brand' => 'Adidas',
                'price' => 100,
                'category' => 'men',
                'imageFilename' => 'adidas_stan_smith.png',
                'description' => 'A timeless tennis shoe in white leather with green accents.',
                'sizes' => [40, 41, 42, 43, 44]
            ],
            [
                'name' => 'Air Max 270',
                'brand' => 'Nike',
                'price' => 150,
                'category' => 'women',
                'imageFilename' => 'nike_air_max_270.png',
                'description' => 'A popular lifestyle shoe in a feminine pastel pink color.',
                'sizes' => [36, 37, 38, 39, 40]
            ],
            [
                'name' => 'Cali',
                'brand' => 'Puma',
                'price' => 90,
                'category' => 'women',
                'imageFilename' => 'puma_cali.png',
                'description' => 'A trendy platform sneaker in white leather with elegant gold details.',
                'sizes' => [36, 37, 38, 39, 40]
            ],
            [
                'name' => 'Ultraboost',
                'brand' => 'Adidas',
                'price' => 180,
                'category' => 'women',
                'imageFilename' => 'adidas.png',
                'description' => 'A performance running shoe in a stylish light blue and white knit material.',
                'sizes' => [36, 37, 38, 39, 40]
            ],
            [
                'name' => 'Revolution 5',
                'brand' => 'Nike',
                'price' => 55,
                'category' => 'kids',
                'imageFilename' => 'nike.png',
                'description' => 'A colorful and practical shoe for kids with easy-to-use Velcro straps.',
                'sizes' => [36, 37, 38, 39]
            ],
            [
                'name' => 'Smash v2',
                'brand' => 'Puma',
                'price' => 45,
                'category' => 'kids',
                'imageFilename' => 'puma_panda.png',
                'description' => 'A fun black sneaker featuring an adorable panda graphic on the side.',
                'sizes' => [36, 37, 38]
            ],
            [
                'name' => 'Superstar Kids',
                'brand' => 'Adidas',
                'price' => 50,
                'category' => 'kids',
                'imageFilename' => 'adidas.png',
                'description' => 'A classic kids\' shoe with the iconic shell toe and iridescent three stripes.',
                'sizes' => [36, 37]
            ]
        ];

        foreach ($products as $p) {
            $sourcePath = $sourceDir . '/' . $p['imageFilename'];
            $targetPath = $targetDir . '/' . $p['imageFilename'];
            $imageUrl = null;

            if (File::exists($sourcePath)) {
                File::copy($sourcePath, $targetPath);
                $imageUrl = '/uploads/' . $p['imageFilename'];
            }

            Product::create([
                'name' => $p['name'],
                'brand' => $p['brand'],
                'price' => $p['price'],
                'category' => $p['category'],
                'description' => $p['description'],
                'image_url' => $imageUrl,
                'images' => $imageUrl ? [$imageUrl] : [],
                'sizes' => $p['sizes'],
            ]);
        }
    }
}
