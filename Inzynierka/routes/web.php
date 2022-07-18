<?php

use Illuminate\Support\Facades\Route;
use \App\Http\Controllers\GridController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function ()
{
    return view('body.index');
});

// grid

    //add grid
    Route::get('/grid/add', [GridController::class, 'index'])->name('addGrid');

    Route::post('/grid/gridSubmit', [GridController::class, 'createGridSubmit']) -> name("gridSubmit");

    // show grids
    Route::get('/grid/showGrids',[GridController::class,'showGrids'])->name('showGrids');

    // delete grid
    Route::get('/grid/deleteGrid/{id}',[GridController::class,'deleteGrid'])->name('deleteGrid');

    //edit grid structure
    Route::get('/grid/editGrid/{id}', [GridController::class, 'editGrid'])->name('editGrid');

    //submit edited grid structure
    Route::post('/grid/editGridSubmit/{id}', [GridController::class, 'editGridSubmit'])->name('editGridSubmit');


    //edit products on grid - grid view
    Route::get('/grid/editGridProducts/{id}', [GridController::class, 'editGridProducts'])->name('editGridProducts');

    //edit specific products on grid

    Route::get('/grid/editGridCellProducts/{id}/{id2}', [GridController::class, 'editGridCellProducts'])->name('editGridCellProducts');

    //add specific product to grid specific cell
    Route::post('/grid/addGridSubmitProducts', [GridController::class, 'addGridCellProduct'])->name('addGridCellProduct');


    // delete specific product from grid
    Route::get('/grid/deleteGridProduct/{id}', [GridController::class, 'deleteGridProduct'])->name('deleteGridProduct');



