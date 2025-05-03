<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Schema;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Fix for MySQL older versions with max key length issues
        Schema::defaultStringLength(191);
        
        // CORS headers are now handled by Laravel CORS middleware
        // so we don't need to set them manually here
    }
}
