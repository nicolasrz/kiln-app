<?php

use App\Http\Controllers\AllowanceController;
use Illuminate\Support\Facades\Route;

use Inertia\Inertia;

Route::get('/', [AllowanceController::class, 'index'])->name('allowances.index');
Route::get('/allowances/create', [AllowanceController::class, 'create'])->name('allowances.create');
Route::post('/allowances/store', [AllowanceController::class, 'store'])->name('allowances.store');
Route::get('/allowances/edit/{allowance}', [AllowanceController::class, 'edit'])->name('allowances.edit');
Route::put('/allowances/update/{allowance}', [AllowanceController::class, 'update'])->name('allowances.update');
Route::delete('/allowances/destroy/{allowance}', [AllowanceController::class, 'destroy'])->name('allowances.destroy');
