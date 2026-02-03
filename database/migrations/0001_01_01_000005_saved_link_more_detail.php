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
            // In bytes
            $table->integer('size')->nullable(false)->default(0);
        });

        Schema::table('saved_links', function (Blueprint $table) {
            $table->date('source_date')->nullable(true);
            $table->string('full_source', length: 255)->nullable(true);
            $table->string('base_source', length: 50)->nullable(true);
            // Exemple, a full source is https://jacobin.com/2026/02/natural-disaster-insurance-california-wildfires and the base source is jacobin.com
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void {}
};
