# itsaq
Quiz Application developed for Information Technology Students Association (ITSA) organization at STI College Novaliches.

## Requirements
* Node.js >= 6
* MySQL
* Facebook app (developers.facebook.com)

## Installation instructions
1. Install NPM dependencies with `npm install`
2. Create `.env` file from `.env.example`, and set the database configuration and Facebook application ID.
3. Install the database using `node ace migration:run`
4. Populate the database with default values using `node ace db:seed`
5. Start the server using `npm run serve`

## Administration
The default username is **admin** and the default password is **admin**. The administration page can be accessed by default at _http://localhost:3333/admin_
