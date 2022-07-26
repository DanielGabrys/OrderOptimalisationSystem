<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Grid extends Model
{
    use HasFactory;

    protected $table = 'grids';
    protected $fillable = ['isActive'];

    public function grid()
    {
        return $this->belongsToMany(Product::class)->withPivot('position','id','desired_position');
    }

}
