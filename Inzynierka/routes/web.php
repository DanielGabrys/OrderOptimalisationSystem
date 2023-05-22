<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Controller;

use App\Http\Controllers\{GridController, GridProductsCntroller, OrderController, ProductController};

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('startPage.welcome');
});

Route::get('/dashboard', function ()
{
    return view('body.index');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware(['auth',])->group(function ()
{
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');


    Route::group(['prefix' => 'grid'], function()
    {

        Route::middleware(['AuthResource',])->group(function ()
        {
            // activate grid
            Route::get('/ActivateGrid/{id}',[GridController::class,'activateGrid'])->name('activateGrid');

            // delete grid
            Route::get('/deleteGrid/{id}',[GridController::class,'deleteGrid'])->name('deleteGrid');



            //edit grid structure -1-page-form
            Route::get('/editGrid/{id}', [GridController::class, 'editGrid'])->name('editGrid');
            Route::post('/editGrid/{id}', [GridController::class, 'editGridSubmit'])->name('editGridPaths');


            //submit edited grid structure
            Route::post('/editGridSubmit/{id}', [GridController::class, 'editBFSPathsSubmit'])->name('editGridSubmit');


        });

        //add grid -1-page form
        Route::get('/add', [GridController::class, 'index'])->name('addGrid');
        Route::post('/addPaths', [GridController::class, 'createGridSubmit']) -> name("gridSubmit");

        //add grid - 2-page form
        Route::get('/addPaths', [GridController::class, 'addBFSPathsGet']) -> name("gridSubmitGet");
        Route::post('/addPaths', [GridController::class, 'createGridSubmit']) -> name("gridSubmit");

        //add grid - save data
        Route::post('/addPathSubmit', [GridController::class, 'addBFSPathsSubmit'])->name('addGridPaths');



        // show grids
        Route::get('/showGrids',[GridController::class,'showGrids'])->name('showGrids');

        Route::group(['prefix' => 'optimalisation'], function() {
            // order optimalisation containers

            Route::get('/start', [GridController::class, 'orderOptimalisationContainers'])->name('orderOptimalisationContainers');

            //results
            Route::post('/create', [GridController::class, 'orderOptResultsSubmit'])->name('orderOptResults');
            //Route::get('/grid/orderOptResults',[GridController::class, 'orderOptResults'])->name('orderOptimalisationResults');

            Route::get('/batches', [GridController::class, 'orderOptResults'])->name('orderOptResult');
        });
    });



    Route::group(['prefix' => 'products'], function()
    {
        //show products
        Route::get('/all', [ProductController::class, 'showProducts'])->name('showProducts');

        // add product
        Route::post('/add', [ProductController::class, 'addProduct'])->name('addProduct');

        // delete product
        Route::get('/delete{id}', [ProductController::class, 'deleteProduct'])->name('deleteProduct');


    });



    Route::group(['prefix' => 'gridProducts'], function()
    {

        Route::group(['prefix' => 'grid','middleware'=>['AuthResource']], function() {

            //edit products on grid - grid view
            Route::get('/{id}', [GridProductsCntroller::class, 'editGridProducts'])->name('editGridProducts');

            //edit specific products on grid

            Route::get('/{id}/product/{id2}/edit', [GridProductsCntroller::class, 'editGridCellProducts'])->name('editGridCellProducts');

            // delete specific product from grid
            Route::get('/{id}/delete', [GridProductsCntroller::class, 'deleteGridProduct'])->name('deleteGridProduct');

            // BFS
            Route::get('/{id}/Paths', [GridController::class, 'Paths'])->name('Paths');
            Route::post('/{id}/createPaths', [GridController::class, 'uploadNodesPaths'])->name('uploadNodesPaths');
        });

        //add specific product to grid specific cell
        Route::post('/create', [GridProductsCntroller::class, 'addGridCellProduct'])->name('addGridCellProduct');

    });


    Route::group(['prefix' => 'orders'], function()
    {
        //show orders
        Route::get('/allOnGrid', [OrderController::class, 'showOrders'])->name('showOrders');

        // addOrder
        Route::post('/create', [OrderController::class, 'uploadOrders'])->name('uploadOrders');
        // delete order
        Route::get('/{id}/delete', [OrderController::class, 'deleteOrder'])->name('deleteOrder');
    });


});

require __DIR__.'/auth.php';
