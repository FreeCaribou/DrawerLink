<?php

namespace App\Console\Commands;

use App\Models\User;
use Illuminate\Console\Command;

class CreateUser extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:create-user';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create a new user';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('We will create a new user');
        $email = $this->ask('What is the email of the new user?', 'admin@drawerlink.net');
        $this->info('Ok, '.$email);
        $name = $this->ask('And his name?', $email);
        $this->info('Ok, '.$name);
        $password = $this->secret('And now type a password please (it will be hidden in the console');

        User::firstOrCreate(
            ['email' => $email],
            [
                'name' => $name,
                'password' => $password,
                'email_verified_at' => now(),
            ]
        );
        $this->info('The user is now created !');
    }
}
