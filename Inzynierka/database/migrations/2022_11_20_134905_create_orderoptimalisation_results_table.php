<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('batches', function (Blueprint $table)
        {
            $table->id();
            $table->Biginteger('grid_id')->unsigned();
            $table->Biginteger('batch_id')->unsigned();
            $table->String("orders");
            $table->LongText("products_id");
            $table->integer('distance')->unsigned();
            $table->Text("path");
            $table->LongText("detailed_path");
            $table->Text("containers");

            $table->foreign('grid_id')->references('id')->on('grids')->onDelete('cascade');


            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('Order_Optimisation_results');
    }
};
