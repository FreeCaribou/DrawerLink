<?php

use App\Models\SavedObjectProp;
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
        Schema::create('saved_objects', function (Blueprint $table) {
            $table->id();
            $table->longText('content');
            $table->foreignIdFor(SavedObjectProp::class)->onDelete('cascade');
            $table->foreign('saved_object_prop_id')->references('id')->on('saved_object_props');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('saved_objects');
    }
};
