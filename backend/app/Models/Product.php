<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'brand',
        'price',
        'category',
        'description',
        'image_url',
        'images',
        'sizes',
    ];

    protected $casts = [
        'sizes' => 'array',
        'images' => 'array',
        'price' => 'float',
    ];
}
