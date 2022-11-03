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

    // activate grid
    Route::get('/grid/ActivateGrid/{id}',[GridController::class,'activateGrid'])->name('activateGrid');

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


// dikstra

    Route::get('/grid/calculateDikstra',[GridController::class, 'calculateDikstra'])->name('calculateDikstra');
    Route::post('/grid/calculateDikstra/Matrix',[GridController::class, 'dikstraMatrix'])->name('dikstraMatrix');

// native algoritm

    Route::get('/grid/calculateNaive',[GridController::class, 'calculateNaive'])->name('calculateNaive');
    Route::post('/grid/calculateNaiveSubmit',[GridController::class, 'calculateNaiveSubmit'])->name('combinationMatrix');
    Route::get('/grid/nativeAlgorithm',[GridController::class, 'nativeAlgorithm'])->name('nativeAlgorithm');

// rectagle_division

    Route::get('/grid/rectangleDivision',[GridController::class, 'rectangleDivision'])->name('rectangleDivision');

// genetic algorithm

Route::get('/grid/geneticAlgo',[GridController::class, 'geneticAlgo'])->name('geneticAlgo');


Route::get('/grid/orderOptimalisation',[GridController::class, 'orderOptimalisation'])->name('orderOptimalisation');


