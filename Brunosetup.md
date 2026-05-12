WARNING!!! NEEDED STEPS BEFORE CONTINUEING!!!
RUN THESE SQL COMMANDS: 
    ALTER TABLE users RENAME COLUMN password_hash TO password;
    ALTER TABLE role RENAME COLUMN role_id TO id;
    ALTER TABLE users RENAME COLUMN user_id TO id;
    ALTER TABLE shift RENAME COLUMN shift_id TO id;
    ALTER TABLE category RENAME COLUMN category_id TO id;
    ALTER TABLE inventory_item RENAME COLUMN item_id TO id;
    ALTER TABLE transaction RENAME COLUMN transaction_id TO id;

CREATE YOUR .ENV FILE:
In the backend folder of the project you should make a file called .env. In it you should have the following fields!

# Server
PORT=3000

# Database
DB_HOST=localhost
DB_USER=postgres
DB_PASS=(Put your own postgres password here)
DB_NAME=food_bank_db
DB_PORT=5432

#JWT key
JWT_SECRET=awihalihwglajsldjw3151352h42oiehui1hwuhr1h913ug9tg1uh9wurg1911g197g3rjow1g0ush10iwhr0138hhn110iwrh10819grwt

After some development difficulties in terms of figuring out the API as well as making the general backend I've managed to make it so you can send information to the database through the backend! Unfortunately I haven't gotten around hooking the frontend to it so to send anything to the database we have to use Bruno! 
The link for Bruno's website(https://www.usebruno.com/)

In order to get it started you will have to run a localhost on your pc, preferably through vscode. This would require you to go to the directory of the folder the index.js file is in and type in the terminal, "node index.js". Afterwards you'll need to boot up Bruno and follow these steps:
1. Create a new collection and name it whatever you want!
2. Make a new HTTP request in the collection you made and make it a POST with the URL http://localhost:3000/auth/register
3. Make the body of it a JSON file and write in it like so:
    {
        "name': "yourname",
        "email": "yourmail@test.br",
        "password": "bestpassword2006"
    }
4. Press ctrl + Enter or click the arrow pointing left in the top right corner. The response on the right field should look something like this:
    {
        "user": {
            "id": 6,
            "name": "testuser",
            "role_id": 2
            }
    }