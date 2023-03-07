<?php

namespace App\Http\Middleware;

use App\Models\Grid;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ExistAnyGrid
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
        $grid = Grid::where('user_id',Auth::id())->first();
        //dd($grid);

            if(is_null($grid))
            {
                return redirect()->route('addGrid')->with('middleware','Przed operacją należy wcześniej utworzyć model magazynu');
            }
            else
            {
                return $next($request);
            }

    }
}
