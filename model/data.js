const db = require("../config/db")



class DataCrud{
    async CreateData(image_url, title, content, category){
        try {
            const result = await db.query(`
                INSERT INTO data(image_url, title, content, category)
                VALUES($1, $2, $3, $4)
                RETURNING *
                `,[image_url, title, content, category])
            return result.rows
        } catch (error) {
            console.log(error)
            throw error.message
        }
    }

    async UpdateData(image_url, title, content, category, id){
        try {
            const result= await db.query(`
                UPDATE data
                SET image_url= $1, title= $2, content =$3, category= $4
                WHERE dataid= $5
                RETURNING *
                `, [image_url, title, content, category, id])
                return result.rows
        } catch (error) {
            console.log(error.message)
            throw error.message
        }
    }

    async DeleteData(id){
        try {
            const result= await db.query(`
                DELETE FROM data
                WHERE dataid= $1
                RETURNING *
                `,[id])
                return result.rows
        } catch (error) {
            console.log(error.message)
            throw error.message
        }
    }

    async UserComment(userid, dataid, comment){
        try {
            const result= await db.query(`
                INSERT INTO comments(userid, dataid, comment)
                VALUES($1, $2, $3)
                RETURNING *
                `,[userid, dataid, comment])
                return result.rows[0]
        } catch (error) {
            console.log(error.message)
            throw error.message
        }
    }

    async DisplayData(){
        try {
            const result= await db.query(`
                SELECT * FROM data
                `)
                return result.rows
        } catch (error) {
            throw error.message
            console.log( error.message)
        }
    }
    
    async SingleData(singleNewsId){
       try {
         const result= await db.query(`
            SELECT * FROM data 
            WHERE dataid= $1
            `,[singleNewsId])
            return result.rows[0]
       } catch (error) {
        console.log(error.message)
        throw error.message
       }
    }
}

module.exports= new DataCrud()