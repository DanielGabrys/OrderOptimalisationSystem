<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Grid>
 */
class GridFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $x = $this->faker->randomFloat(1,2,50);
        $y = $this->faker->randomFloat(1,2,50);
        $entry =  $this->faker->numberBetween(1,$x*$y);

        $counter = 1;
        $str ="[";
        $nodes=array();
        for($i=0;$i<$x;$i++)
            {
                $str.="[";
                $nodes_in=array();
                for($j=0;$j<$y;$j++)
                {

                    if($counter==$entry)
                    {
                        $nodes_in[$j] = 1;
                    }
                    else
                    {
                        $nodes_in[$j] = $this->faker->numberBetween(-1,0);
                    }
                    $str.=$nodes_in[$j];

                    if($j<$y-1)
                    {
                        $str.=",";
                    }

                    $counter++;
                }
                $str.="],";
                $nodes[$i]=$nodes_in;
            }

        $str.="]";
       // var_dump($str);

        return [
            'height' => $x,
            'width' => $y,
            'entry' => $entry,
            'shelfs' => $str,
            'isActive' => 0,
           // 'size_Z' => $this->faker->randomFloat(1,2,20),
            'created_at' => $this->faker->dateTime(),
            'updated_at' => $this->faker->dateTime(),
        ];
    }


    private function convert_multi_array($array)
    {
        $out = implode("&",array_map(function($a) {return implode("~",$a);},$array));
        print_r($out);
    }

}
