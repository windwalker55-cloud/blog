const dotenv=require("dotenv").config()
const db=require("../config/db")

async function up(){
                try {
                    await db.query(`
                        CREATE TABLE IF NOT EXISTS users( 
                        userid UUID DEFAULT gen_random_uuid() PRIMARY KEY,
                        email VARCHAR(225) NOT NULL UNIQUE,
                        username VARCHAR(225) NOT NULL UNIQUE,
                        Password VARCHAR(225) NOT NULL,
                        role VARCHAR(225) DEFAULT 'user',
                        password_reset_token VARCHAR(225),
                        password_reset_expires TIMESTAMP,
                        email_confrimation_token VARCHAR(225),
                        email_confrimation_expires TIMESTAMP,
                        is_email_confrimed BOOLEAN DEFAULT FALSE,
                        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                        );
                        `);
                } catch (error) {
                    console.log(error.message)
                }
} 

async function down(){

    try {
                await db.query(`
                    DROP TABLE IF EXISTS users;
                    `);


                    } catch (error) {
                        console.log(error.message)
                    }

}



up()