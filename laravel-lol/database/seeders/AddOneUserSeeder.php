<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;

class AddOneUserSeeder extends Seeder
{
    public function run(): void
    {
        $adminUserName = env('ADMIN_USER_NAME', 'caribou');
        $adminUserEmail = env('ADMIN_USER_EMAIL', 'freecaribou@gmail.com');
        $adminUserPassword = env('ADMIN_USER_PASSWORD', 'helloworld');

        User::firstOrCreate(
            ['email' => $adminUserEmail],
            [
                'name' => $adminUserName,
                'password' => $adminUserPassword,
                'email_verified_at' => now(),
            ]
        );
    }
}
