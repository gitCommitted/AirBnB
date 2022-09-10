To clone and spin up app:

Clone app, and cd into the Backend folder.

Create a .env folder with the following:
PORT=
DB_FILE=
JWT_SECRET=
JWT_EXPIRES_IN=

Run:
1. NPM install
--install dependencies

2. dotenv npx sequelize-cli db:migrate
--migrattion for sequelize database

3. dotenv npx sequelize-cli db:seed:all
--add seed data to the databse

4. NMP start
--run backend server

Cd into the Frontend folder.

Run:
1. NPM install
--install dependencies

5. NMP start
--run frontend server


App User Instructions:

On your browser, navigate to the URL: https://airbnb-api-clone-main.herokuapp.com/

Splash page:

Click any link to go to the login/signup forms
Once logged in, you'll be routed back to the Home page.

Home:

Here you'll find ALL SPOTS displayed.
Click any spot to go to the spot details page.

Spot Details:

Here you can see detailed information about the spot and availability.
Here you can also create a NEW BOOKING.

My Bookings:

You'll get here if you save a new booking or click on the "my bookings" link on the nav menu.
This page has a list of ALL BOOKINGS.
You can also EDIT and DELETE your BOOKINGS here.

My Spots:

Click on "my spots" on the nav menu.
Here you can see all of the spots you have created.
Here you can create a NEW SPOT.
You can also EDIT and DELETE your SPOTS here.

My Account:

Click on "my account" on the nav menu.
You'll see your username and email displayed.
You also have an "About this app" link to the GitHup page.
You'll also see a "log out" button. Click that and you'll be redirected to the splash page, and logged out.

