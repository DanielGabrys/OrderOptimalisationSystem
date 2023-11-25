#!/bin/bash

rm -rf OrderOptimalisationSystem
git clone -b MultipleUsers https://github.com/DanielGabrys/OrderOptimalisationSystem.git
cd OrderOptimalisationSystem/
mv Inzynierka/* ./
rm -r Inzynierka/

ls -la

rm ../public_html/*
cp -R public/* ../public_html

cp ../conf/index.php ../public_html
cp ../conf/.env ./

./../../../composer.phar update

php artisan route:clear
php artisan cache:clear
php artisan config:clear
php artisan view:clear
php artisan key:generate
php artisan migrate
php artisan storage:link

cp -r public/storage ../public_html/
