<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\VideoController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->group(function () {
    Route::get("/user", [AuthController::class, "getUser"]);
    Route::post("/logout", [AuthController::class, "logout"]);

    Route::prefix('/videos')->controller(VideoController::class)->group(function () {
        Route::get("/", "index");
        Route::post("/", "store");
        Route::get("/{id}", "show");
    });
});

Route::post("/register", [AuthController::class, "register"]);
Route::post("/login", [AuthController::class, "login"]);
