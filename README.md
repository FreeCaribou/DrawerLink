# Just some test in Laravel / React

## Some command

php artisan db:show - see the db stade

php artisan db:table <x> - see the info details of a table

php artisan make:migration create\_<x>\_table - create a migration file (php artisan make:migration <x> - work too)

php artisan migrate - execute the migration file

php artisan db:seed - seed the database with mock data (php artisan migrate:fresh --seed - the same but with refresh all)

composer run dev - run the project in localhost

php artisan app:create-user - cmd to create a new user, usefull in prod

podman compose -f docker-compose.yaml -p drawerlink_pg up - launch with podman the docker and name it drawerlink_pg

## TODO

- i18n
- clean up migration file for a v1
- make the app real (drawer link)
- make php script to create new user
- verify not too long file and divide it if necessary
- delete or comment all what we dont need (clean up ! delete everything linked to dashboard, user a part of login, taiwlind prop too long, ...)
- better readme here (for the deploy for exemple)
- (cookie message)
