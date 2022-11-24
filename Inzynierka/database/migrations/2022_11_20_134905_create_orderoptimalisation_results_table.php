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
        Schema::create('Order_Optimisation_results', function (Blueprint $table)
        {
            $table->id();
            $table->String("orders");
            $table->String("products_id");
            $table->integer('distance')->unsigned();
            $table->Text("path");
            $table->LongText("detailed_path");

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
