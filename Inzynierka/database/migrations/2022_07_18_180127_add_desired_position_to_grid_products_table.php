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
        Schema::table('grid_product', function (Blueprint $table) {
            $table->integer('desired_position',)->default(0);;
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('grid_product', function (Blueprint $table) {
            $table->dropColumn('desired_position');
        });
    }
};
