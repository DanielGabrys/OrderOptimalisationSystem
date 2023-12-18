<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Grid;
use App\Models\Grid_Product;
use App\Models\Order;
use App\Models\OrderProducts;
use App\Models\Product;
use App\Models\User;
use http\Env\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Vinkla\Hashids\Facades\Hashids;
use function PHPUnit\Framework\isEmpty;


class OrderResourceController extends Controller
{

    public $error_messages =[];
    public $products_not_founded=[];
    public $grid_products_not_founded=[];
    public $db_product_id=[];


    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */

    public function index()
    {
        return response()-> json(User::all());
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function create()
    {

    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request,$hash)
    {
        $key = Hashids::decode($hash);

        if(!$key) return response()->json('Authorisation failed ', 401);
        if(!$ok =$this->ValidateRequestParams($request,$key)) return response()->json($this->error_messages,"400");

       // return $this->ValidateRequestParams($request,$key);
        return  $this->processRequest($request);

    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }


    public function processRequest($body)
    {

        $array = $body->all();
        $json= json_encode($array);
        $decoded = json_decode($json,true);



        DB::beginTransaction();

        try {

            $this->deletePrevOrders($decoded["grid_id"]);

            foreach ($decoded["orders"] as $order)
            {


                $id =  $this->storeRequestOrder($order,$decoded["grid_id"]);
                $this->storeRequestOrderProducts($id,$order["orderItem"]);

            }

            DB::commit();
            return response()->json($decoded,"200");


        } catch (\Exception $e)
        {
            DB::rollback();
            return response()->json(array(["message" => "system error" ]),"500");


        }

    }



    public function storeRequestOrder($order,$grid_id)
    {
            $order_db = new Order();
            $order_db -> order_id = $order["id"];
            $order_db -> primary = 0;
            $order_db->grid_id = $grid_id;

            $order_db->save();

            return $order_db->id;
    }

    public function storeRequestOrderProducts($order_id,$products)
    {

        foreach ($products as $product)
        {
            $order_product = new OrderProducts();
            $order_product->order_id = $order_id;
            $order_product->product_id = $this->db_product_id[$product["id"]];
            $order_product->amount = $product["amount"];

            $order_product->save();
        }

    }


    public function ValidateRequestParams($body,$key)
    {

        $array = $body->all();
        $json= json_encode($array);
        $decoded = json_decode($json,true);
        $user_id = substr($key[0], 16);


        $orders = $decoded["orders"];
        $grid_id = $decoded["grid_id"];


        if(!$this->gridExist($user_id,$grid_id))
        {
            $this->error_messages[] = array(["message" => "grid not found"]);

            return false;
        }

        $user_grid_products = Grid::with("products")->where("id",$grid_id)->first()->products->pluck("id");
        $user_products = Product::where("user_id",$user_id)->get();
        $user_grid_products_ids = Product::whereIn("id",$user_grid_products)->get()->pluck("product_id")->toArray();
        $this->db_product_id = Product::whereIn("id",$user_grid_products)->get()->pluck("id","product_id")->toArray();
        //return response()->json($user_grid_products_ids);



        foreach ($orders as $order)
        {

            $products =$order["orderItem"];


            $this->productExist($products,$user_products);
            $this->productGridExist($products,$user_grid_products_ids,$grid_id);

        }

        if(!empty($this->products_not_founded))
             $this->error_messages[] = array(["message" => "product not founded", "product id" => $this->products_not_founded]);
        if(!empty($this->grid_products_not_founded))
            $this->error_messages[] = array(["message" => "product on grid ".$grid_id." not founded", "product id" => $this->grid_products_not_founded]);


        if(empty($this->error_messages))
             return true;
        return false;

    }


    public function gridExist($user_id,$grid_id)
    {

        $grid = Grid::where("user_id",$user_id)->where("id",$grid_id)->get();

        if ($grid->isEmpty()) return false;
        return true;

    }


    public function productExist($products,$user_products)
    {

        foreach ($products as $product)
        {
            $user_product = $user_products->where("product_id",$product["id"]);

            if ($user_product->isEmpty())
               $this->products_not_founded[] = $product['id'];
        }


    }

    public function productGridExist($products,$grid_products,$grid_id)
    {

        foreach ($products as $key => $product)
        {
            $user_grid_product = in_array($product['id'],$grid_products);

            if (!$user_grid_product)
                $this->grid_products_not_founded[] = $product['id'];

        }


    }

    public function deletePrevOrders($grid_id)
    {

        Order::where("grid_id",$grid_id)->delete();

    }


}
