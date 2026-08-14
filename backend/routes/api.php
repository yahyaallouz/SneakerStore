<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\OrderController;
use Illuminate\Support\Facades\Route;

// Login Auth Action
Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);
Route::middleware('auth:sanctum')->post('/logout', [AuthController::class, 'logout']);

// Core Products CRUD (accessible for admin updates and visitor views)
Route::get('/products', [ProductController::class, 'index']);
Route::post('/products', [ProductController::class, 'store']);
Route::put('/products/{id}', [ProductController::class, 'update']);
Route::delete('/products/{id}', [ProductController::class, 'destroy']);

// Checkout and Order Management Flows
Route::post('/orders', [OrderController::class, 'store']);
Route::get('/orders/analytics', [OrderController::class, 'analytics']); // Placed above to avoid matching {id}
Route::get('/orders/track/{trackingNumber}', [OrderController::class, 'track']);
Route::get('/orders/{id}', [OrderController::class, 'show']);
Route::get('/orders', [OrderController::class, 'index']);
Route::put('/orders/{id}/status', [OrderController::class, 'updateStatus']);
