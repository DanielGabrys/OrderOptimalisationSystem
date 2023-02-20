<?php

namespace Tests\Feature;

use App\Models\Product;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Pagination\Paginator;
use Tests\TestCase;

class ProductsTest extends TestCase
{
    /** @test */

    use RefreshDatabase;
    public function page_contains_products()
    {
        $product = Product::factory()->create();

        $response = $this->get('/ShowProducts');

        $response->assertStatus(200);
        $response-> assertDontSee('Lista produktów jest pusta');
    }

    /** @test */
    public function pagination_active_test()
    {
        $product = Product::factory(10)->create();
        $last = $product->last();
        $first = $product->first();

        $response = $this->get('/ShowProducts');

        $response->assertDontSee($last->name)->assertSee($first->name);

    }

}
