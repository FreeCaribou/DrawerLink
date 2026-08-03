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
        Schema::table('saved_object_props', function (Blueprint $table) {
            $table->string('path', length: 2048)->nullable(true);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void {}
};
