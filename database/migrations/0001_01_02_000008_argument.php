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
        Schema::create('argument_topics', function (Blueprint $table) {
            $table->id();
            $table->string('label', length: 255);
            $table->string('description', length: 2000)->nullable();
            $table->foreignId('user_id');
            $table->foreign('user_id')->references('id')->on('users');
            $table->timestamps();
        });

        Schema::create('arguments', function (Blueprint $table) {
            $table->id();
            $table->string('label', length: 255);
            $table->string('description', length: 5000)->nullable();
            $table->foreignId('argument_topic_id');
            $table->foreign('argument_topic_id')->references('id')->on('argument_topics');
            $table->timestamps();
        });

        Schema::create('argument_topic_saved_link', function (Blueprint $table) {
            $table->id();
            $table->foreignId('saved_link_id')->constrained();
            $table->foreignId('argument_topic_id')->constrained();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void {}
};
