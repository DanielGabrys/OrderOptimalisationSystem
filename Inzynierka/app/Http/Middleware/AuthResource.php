<?php

namespace App\Http\Middleware;

use App\Models\Grid;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthResource
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

        //dd($request->id);

        $grid = Grid::where('id',$request->id)->first();

        if(is_null($grid))
        {
            return redirect('/');
        }

        if ($grid->user_id=== Auth::id())
        {
            return $next($request);
        }
        return redirect('/');
    }
}
