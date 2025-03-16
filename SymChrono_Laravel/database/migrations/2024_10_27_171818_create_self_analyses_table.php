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
        Schema::create('self_analyses', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_models_id')->constrained()->onDelete('cascade');
            $table->text('emotion')->nullable();
            $table->text('blue')->nullable();
            $table->text('green')->nullable();
            $table->text('orange')->nullable();
            $table->text('red')->nullable();
            $table->text('yellow')->nullable();
            $table->char('expense',length:20);
            $table->integer('rating');
            $table->timestamp('creation_date'); 
            $table->timestamp('updated_date')->nullable();              
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('self_analyses');
    }
};
