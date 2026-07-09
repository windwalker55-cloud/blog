const dotenv=require("dotenv").config()
const db=require("../config/db")

async function up(){
                try {
                    await db.query(`
                        CREATE TABLE IF NOT EXISTS comments( 
                        commentid UUID DEFAULT gen_random_uuid() PRIMARY KEY,
                        userid UUID REFERENCES users(userid),
                        dataid UUID REFERENCES data(dataid),
                        comment TEXT NOT NULL,
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
                    DROP TABLE IF EXISTS comments;
                    `);


                    } catch (error) {
                        console.log(error.message)
                    }

}



up()