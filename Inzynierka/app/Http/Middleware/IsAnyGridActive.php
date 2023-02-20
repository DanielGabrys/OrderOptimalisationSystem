<?php

namespace App\Http\Middleware;

use App\Models\Grid;
use Closure;
use Illuminate\Http\Request;

class IsAnyGridActive
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {




        $grid=Grid::where('isActive','=',1)->first();
        if(is_null($grid))
        {
            return redirect()->route('showGrids')->with('middleware','Aktywuj jedną z z siatek siatkę');
        }


        return $next($request);
    }
}
