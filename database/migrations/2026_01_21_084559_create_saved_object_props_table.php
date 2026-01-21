<?php

use App\Models\SavedLink;
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
        Schema::table('saved_links', function (Blueprint $table) {
            $table->string('description', length: 2000)->nullable();
        });

        Schema::create('saved_object_props', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('mime_type');
            $table->foreignIdFor(SavedLink::class);
            $table->timestamps();

            $table->foreign('saved_link_id')->references('id')->on('saved_links');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('saved_object_props');
    }
};
