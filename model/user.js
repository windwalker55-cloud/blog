const db = require("../config/db");
const bcrypt= require("bcrypt")



class Users{
    async Signup( email, username, password){
        try {
            const genSalt= await bcrypt.genSalt(10)
            const hashPassword= await bcrypt.hash(password, genSalt)
            const result = await db.query(`
                INSERT INTO users(email, username, password)
                VALUES($1, $2, $3)
                RETURNING *
                `, [email, username, hashPassword])
                return result.rows[0]
            
        } catch (error) {
            console.log(error.message)
            throw error
        }

    }

    async Login(email){
        try {
            const result = await db.query(`
                SELECT * FROM users
                WHERE email= $1
                `,[email])
            return result.rows[0]
        } catch (error) {
            throw error
            console.log(error.message)
        }

    }

    async UpdateUsername(username,id){
        try {
            const result = await db.query(`
                UPDATE users
                SET username= $1
                WHERE userid= $2
                RETURNING *
                `,[username, id])
            return result.rows[0]
        } catch (error) {
            console.log(error.message)
            throw error.message
        }
    }

    async UpdatePassword(password, id){
        try {
            const hashPassword= await bcrypt.hash(password, 10)
            const result= await db.query(`
                UPDATE users
                SET password= $1
                WHERE userid= $2
                RETURNING *
                `,[hashPassword, id])
            
        } catch (error) {
            throw error.message
            console.log( error.message)
        }
    }

    async DeleteUser(id){
        try {
            const result = await db.query(`
                DELETE FROM users
                WHERE userid= $1
                RETURNING *
                `,[id])
                return result.rows[0]
            
        } catch (error) {
            throw error.message
            console.log( error.message)
        }
    }

    // reviews
    



}

module.exports= new Users()