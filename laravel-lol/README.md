# Just some test in Laravel / React

## Some command

php artisan db:show - see the db stade

php artisan db:table <x> - see the info details of a table

php artisan make:migration create\_<x>\_table - create a migration file (php artisan make:migration <x> - work too)

php artisan migrate - execute the migration file

php artisan db:seed - seed the database with mock data (php artisan migrate:fresh --seed - the same but with refresh all)

php artisan db:seed --class=AddOneUserSeeder - after completed the value in the .env, launch that to create one user

composer run dev - run the project in localhost

## TODO

- use of shadcn
- i18n
- clean up migration file for a v1
- make the app real (drawer link)
- verify not too long file and divide it if necessary
- delete or comment all what we dont need (clean up ! delete everything linked to dashboard, user a part of login, taiwlind prop too long, ...)
- better readme here (for the deploy for exemple)
- (cookie message)
