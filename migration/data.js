const dotenv=require("dotenv").config()
const db=require("../config/db")

async function up(){
                try {
                    await db.query(`
                        CREATE TABLE IF NOT EXISTS data( 
                        dataid UUID DEFAULT gen_random_uuid() PRIMARY KEY,
                        image_url TEXT,
                        title TEXT,
                        content TEXT,
                        category TEXT,
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
                    DROP TABLE IF EXISTS data;
                    `);


                    } catch (error) {
                        console.log(error.message)
                    }

}



up()