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
            $table->dropForeign(['saved_link_id']);
            $table->foreign('saved_link_id')
                ->references('id')
                ->on('saved_links')
                ->onDelete('cascade');
        });

        Schema::table('saved_objects', function (Blueprint $table) {
            $table->dropForeign(['saved_object_prop_id']);
            $table->foreign('saved_object_prop_id')
                ->references('id')
                ->on('saved_object_props')
                ->onDelete('cascade');
        });

        Schema::table('saved_link_tag', function (Blueprint $table) {
            $table->dropForeign(['saved_link_id']);
            $table->dropForeign(['tag_id']);

            $table->foreign('saved_link_id')->references('id')->on('saved_links')->onDelete('cascade');
            $table->foreign('tag_id')->references('id')->on('tags')->onDelete('cascade');
            $table->index(['saved_link_id', 'tag_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void {}
};
