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
        Schema::create('check_journals', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_models_id')->constrained()->onDelete('cascade');
            $table->integer('current_month');
            $table->integer('calander_date');
            $table->boolean('has_journal');
            $table->timestamp('creation_date'); 
            $table->timestamp('updated_date')->nullable();    
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('check_journals');
    }
};
