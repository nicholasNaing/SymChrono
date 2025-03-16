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
        Schema::create('diary_models', function (Blueprint $table) {
            $table->id();
            $table->foreignId("user_models_id")->constrained()->onDelete('cascade');
            $table->text("morning");            
            $table->text("afternoon");
            $table->text("evening");
            $table->timestamp('creation_date'); 
            $table->timestamp('updated_date')->nullable();

            $table->unique(['user_models_id','creation_date']); // Unique constraint


        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('diary_models');
    }
};
