@extends('auth.auth_main_theme')

    @section('auth_content')
                            <form method="POST" action="{{ route('login') }}">
                                @csrf
                                <div class="form-group">
                                    <x-input-label for="password"  class="sr-only" :value="__('Password')" />
                                    <x-text-input id="email" class="form-control" type="email" name="email" placeholder="Email address"  :value="old('email')" required autofocus autocomplete="username" />
                                    <x-input-error :messages="$errors->get('email')" class="mt-2" />


                                </div>
                                <div class="form-group mb-4">
                                    <x-input-label for="password" class="sr-only" :value="__('Password')" />
                                    <x-text-input id="password" class="form-control" type="password" name="password" placeholder="***********" required autocomplete="current-password" />
                                    <x-input-error :messages="$errors->get('password')" class="mt-2" />

                                </div>
                                <input name="login" id="login" class="btn btn-block login-btn mb-4" type="submit" value="Login">

                                <p class="login-card-footer-text">Don't have an account? <a href="{{ route('register') }}" class="text-reset">Register here</a></p>


                                @if (Route::has('password.request'))
                                    <a class="underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800" href="{{ route('password.request') }}">
                                        <a href="{{ route('password.request') }}" class="forgot-password-link">Forgot password?</a></a>
                                @endif

                            </form>

    @endsection

