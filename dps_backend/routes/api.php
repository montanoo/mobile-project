<?php

use App\Http\Controllers\DoctorAppointmentController;
use App\Http\Controllers\PatientController;
use App\Http\Controllers\SpecialtyController;
use App\Http\Controllers\UserController;
use App\Models\DoctorAppointment;
use App\Models\Specialty;
use Illuminate\Http\Request;
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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/login', [UserController::class, 'login']);
Route::post('/register', [UserController::class, 'store'])->name('user.register');

$guestRoutes = ['index', 'show'];

Route::middleware('auth:sanctum')->group(function () use ($guestRoutes) {
    Route::get('/my', [UserController::class, 'my']);
    Route::get('/logout', [UserController::class, 'logout'])->middleware('auth:sanctum');
    Route::resource('specialty', SpecialtyController::class);
    Route::resource('patients', PatientController::class);
    Route::resource('appointments', DoctorAppointmentController::class)->except('show');
   Route::get('/appointments/{id}', [DoctorAppointmentController::class, 'show'])->where('id', '[0-9]+');
});


