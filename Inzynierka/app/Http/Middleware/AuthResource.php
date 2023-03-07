<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

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

        if ($request->route('companyID')) {
            $company = Company::find($request->route('companyID'));
            if ($company && $company->user_id != auth()->user()->id) {
                return redirect('/');
            }
        }

        return $next($request);
    }
}
