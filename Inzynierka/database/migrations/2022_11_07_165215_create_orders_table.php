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
        Schema::create('order', function (Blueprint $table) {
            $table->id();
            $table->Biginteger('order_id')->unsigned();
            $table->boolean("primary");
            $table->timestamps();

            $table->Biginteger('grid_id')->unsigned();
            $table->foreign('grid_id')->references('id')->on('grid')->onDelete('cascade');


            $table->unique(['grid_id','order_id']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('order');
    }
};
