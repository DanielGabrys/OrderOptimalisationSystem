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
        Schema::create('grid_product', function (Blueprint $table)
        {
            $table->id();

            $table->Biginteger('grid_id')->unsigned();
            $table->Biginteger('product_id')->unsigned();
            $table->integer('position');

            $table->foreign('grid_id')->references('id')->on('grid')->onDelete('cascade');
            $table->foreign('product_id')->references('id')->on('product')->onDelete('cascade');

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
        //
    }
};
