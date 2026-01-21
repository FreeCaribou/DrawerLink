# Drawer Link

A little app to store "link" to retrieve it easily later and share it

## TODO

- make the app real (drawer link, have "link" in drawer, search it by drawer and tag, share it, edit it)
- i18n
- for link description, have wysiwyg
- delete or comment all what we dont need (clean up ! delete everything linked to dashboard, user a part of login, taiwlind prop too long, ...)
- and clean up the code (avoid big file, separate component in front and divide service in back)
- better readme here (for the deploy for exemple, for better link to the stack)
- (cookie message)

## Tech

### Laravel with React starter kit

https://laravel.com/starter-kits

## Some command

php artisan db:show - see the db stade

php artisan db:table <x> - see the info details of a table

php artisan make:migration create\_<x>\_table - create a migration file (php artisan make:migration <x> - work too)

php artisan migrate - execute the migration file

php artisan db:seed - seed the database with mock data (php artisan migrate:fresh --seed - the same but with refresh all)

composer run dev - run the project in localhost

php artisan app:create-user - cmd to create a new user, usefull in prod

podman compose -f docker-compose.yaml -p drawerlink_pg up - launch with podman the docker and name it drawerlink_pg
