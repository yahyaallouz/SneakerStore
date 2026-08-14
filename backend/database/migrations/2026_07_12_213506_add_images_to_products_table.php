<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('products', function (Blueprint $table) {
            $table->json('images')->nullable()->after('image_url');
        });

        // Copy existing image_url values into images JSON array
        \Illuminate\Support\Facades\DB::table('products')->get()->each(function ($product) {
            if ($product->image_url) {
                \Illuminate\Support\Facades\DB::table('products')
                    ->where('id', $product->id)
                    ->update(['images' => json_encode([$product->image_url])]);
            } else {
                \Illuminate\Support\Facades\DB::table('products')
                    ->where('id', $product->id)
                    ->update(['images' => json_encode([])]);
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('products', function (Blueprint $table) {
            $table->dropColumn('images');
        });
    }
};
