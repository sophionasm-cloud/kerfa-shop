<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\File;
use App\Http\Controllers\AdminAuthController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\AuthController;

// --- API ROUTES ---
// Admin Login
Route::post('/api/login', [AdminAuthController::class, 'login']);

// User Registration
Route::post('/api/register', [AuthController::class, 'register']);

// GET products - PUBLIC
Route::get('/api/products', [ProductController::class, 'index']);

// --- PROTECTED ROUTES (Login required) ---
Route::middleware('auth:sanctum')->group(function () {
    
    // Order management
    Route::get('/api/orders', [OrderController::class, 'index']);
    Route::post('/api/orders', [OrderController::class, 'store']);
    Route::put('/api/orders/{id}', [OrderController::class, 'updateStatus']);
    Route::delete('/api/orders/{id}', [OrderController::class, 'destroy']);
    
    // Product management
    Route::post('/api/products', [ProductController::class, 'store']);
    Route::delete('/api/products/{id}', [ProductController::class, 'destroy']);
    Route::put('/api/products/{id}', [ProductController::class, 'update']);
    
    // Logout
    Route::post('/api/logout', [AuthController::class, 'logout']);
});

// --- FALLBACK ROUTE ---
// This MUST be at the bottom. It catches any URL that isn't an API route 
// and serves your Vue index.html, allowing Vue Router to manage navigation.
Route::fallback(function () {
    return File::get(public_path('index.html'));
});
