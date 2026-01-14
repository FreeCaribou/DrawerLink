<?php

namespace Database\Seeders;

use App\Models\SavedLink;
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

        SavedLink::create(['label' => 'A stupid link about stupid people']);
        SavedLink::create(['label' => 'You will not believe what you will see']);
    }
}
