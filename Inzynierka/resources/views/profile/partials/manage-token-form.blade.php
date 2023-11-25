<section>
    <header>
        <h2 class="text-lg font-medium text-gray-900 dark:text-gray-100">
            {{ __('Access Token') }}
        </h2>

        <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">
            {{ __("Refresh your API token") }}
        </p>
    </header>

    <form method="post" action="{{route('getToken')}}" class="mt-6 space-y-6">
        @csrf

        <div>
            <x-input-label id="token" name="token" type="text" class="mt-1 block w-full" :value="old('name', $token)" required autofocus autocomplete="name" />
            <x-input-error class="mt-2" :messages="$errors->get('token')" />
        </div>

        <div>
            <x-input-label id="merchant" name="merchant" type="text" class="mt-1 block w-full" :value="old('name', $merchant)" required autofocus autocomplete="name" />
            <x-input-error class="mt-2" :messages="$errors->get('merchant')" />
        </div>

        <button type="submit" class="btn btn-primary">Submit</button>


    </form>
</section>
