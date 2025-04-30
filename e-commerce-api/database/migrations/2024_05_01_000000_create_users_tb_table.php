<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('users_tb', function (Blueprint $table) {
            $table->id('user_id');
            $table->string('username')->unique();
            $table->string('password');
            $table->string('full_name');
            $table->text('address');
            $table->string('contact_number');
            $table->string('email_address')->unique();
            $table->rememberToken();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users_tb');
    }
};
