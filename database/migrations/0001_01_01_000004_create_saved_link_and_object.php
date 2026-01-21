<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Models\SavedLink;
use App\Models\SavedObjectProp;
use App\Models\User;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('saved_links', function (Blueprint $table) {
            $table->id();
            $table->string('label');
            $table->string('description', length: 2000)->nullable();
            $table->foreignIdFor(User::class)->onDelete('cascade');
            $table->foreign('user_id')->references('id')->on('users');
            $table->timestamps();
        });

        Schema::create('saved_object_props', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('mime_type');
            $table->foreignIdFor(SavedLink::class)->onDelete('cascade');
            $table->timestamps();

            $table->foreign('saved_link_id')->references('id')->on('saved_links');
        });

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
        Schema::dropIfExists('saved_links');
        Schema::dropIfExists('saved_object_props');
        Schema::dropIfExists('saved_objects');
    }
};
