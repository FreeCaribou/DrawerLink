# Drawer Link

A little app to store "link" to retrieve it easily later and share it

## TODO

- make the app real, what needed for a v1
    - Detail page of saved link with delete and edit
    - Link source, a string to be fill in by a https text, and we extract the domaine part and the full url
    - Show link date (the created on and the "source date")
    - Search with draw / tags
    - Share a saved link to someone else
    - Remove all the TODO from code !
- i18n
- for link description, have wysiwyg
- delete or comment all what we dont need (clean up ! delete everything linked to dashboard, user a part of login, taiwlind prop too long, ...)
- and clean up the code (avoid big file, separate component in front and divide service in back)
- have an icon not AI generated
- (cookie message)
- For the tag of a saved link
    - For the form, propose some tag by some logic
    - For the search, show the most used tag for example
- Make relations between link
- Dark mode
- bash script for the install

## Tech

### Laravel with React starter kit

https://laravel.com/starter-kits

## Production

- Most of the information are there, https://laravel.com/docs/12.x/deployment

- composer install --no-dev --optimize-autoloader - install the base package

- php artisan key:generate - usefull to create the APP_KEY env var - needed for the first deploy

- php artisan migrate - to make the migration of the db schema in case of new thing

- php artisan optimize

- npm i && npm run build - to launch the frontend part

## Some command

php artisan db:show - see the db stade

php artisan db:table <x> - see the info details of a table

php artisan make:migration create\_<x>\_table - create a migration file (php artisan make:migration <x> - work too)

php artisan migrate - execute the migration file

php artisan db:seed - seed the database with mock data (php artisan migrate:fresh --seed - the same but with refresh all)

composer run dev - run the project in localhost

php artisan app:create-user - cmd to create a new user, usefull in prod

podman compose -f docker-compose.yaml -p drawerlink_pg up - launch with podman the docker and name it drawerlink_pg
