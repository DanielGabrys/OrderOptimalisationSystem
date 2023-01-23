<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Grid extends Model
{
    use HasFactory;

    protected $fillable = array('isActive', 'nodes_shortest_paths');

    public function products()
    {
        return $this->belongsToMany(Product::class)->withPivot('position','id','desired_position');
    }

}
