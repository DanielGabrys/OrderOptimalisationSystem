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
        Schema::create('grid', function (Blueprint $table) {
            $table->id();
            $table->Biginteger('user_id')->unsigned();
            $table->String('name');
            $table->integer('width') ;
            $table->integer('height') ;
            $table->integer('entry');
            $table->LongText('shelfs');

            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');

            $table->timestamps();

            $table->unique(['user_id','grid_id']);

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('grid');
    }
};
