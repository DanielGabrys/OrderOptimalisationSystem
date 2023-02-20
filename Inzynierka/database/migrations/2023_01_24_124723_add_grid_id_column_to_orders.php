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
        Schema::table('order', function (Blueprint $table) {

            $table->Biginteger('grid_id')->unsigned();
            $table->foreign('grid_id')->references('id')->on('grid')->onDelete('cascade');

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('orders', function (Blueprint $table) {
            $table->Biginteger('grid_id')->unsigned();
            $table->foreign('grid_id')->references('id')->on('grids')->onDelete('cascade');

        });
    }
};
