<?php

namespace Tests\Feature;

use App\Models\Grid;
use App\Models\Grid_Product;
use App\Models\Order;
use App\Models\Product;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class ProductsOnGrid extends TestCase
{
    /** @test */

    use RefreshDatabase;
    public function add_orders()
    {

        $response = $this->visit('/products');

    }
}

