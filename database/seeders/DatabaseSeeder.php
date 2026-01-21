<?php

namespace Database\Seeders;

use App\Models\SavedLink;
use App\Models\SavedObjectProp;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $primaryUser = User::firstOrCreate(
            ['email' => 'drawerlink@freecaribou.net'],
            [
                'name' => 'freecaribou',
                'password' => 'helloworld',
                'email_verified_at' => now(),
            ]
        );

        $savedLinkOne = SavedLink::create(['label' => 'Two stupid links about stupid people']);
        $savedLinkTwo = SavedLink::create(['label' => 'Tax the Rich', 'description' => 'And other good idea']);
        $savedLinkThree = SavedLink::create(['label' => 'You will not believe what you will see', 'description' => 'So ? You believe it or not ?']);

        SavedObjectProp::create(['name' => 'document_one.pdf', 'mime_type' => 'application/pdf', 'saved_link_id' => $savedLinkOne->id]);
        SavedObjectProp::create(['name' => 'document_two.pdf', 'mime_type' => 'application/pdf', 'saved_link_id' => $savedLinkOne->id]);
        SavedObjectProp::create(['name' => 'document_three.pdf', 'mime_type' => 'application/pdf', 'saved_link_id' => $savedLinkThree->id]);
    }
}
