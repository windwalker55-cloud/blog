const DataCrud= require("../model/data")



class DataController{
    async Create(req, res){
        try {
            const {image_url, title, content, category}=req.body
            const data= await DataCrud.CreateData(image_url, title, content, category)
            return res.redirect("/admindashboard")
            
        } catch (error) {
           console.log(error.message)
           throw error.message 
        }
    }

    async Update(req, res){
        try {
            const{image_url, title, content, category}= req.body
            const {id} = req.params
            const data= await DataCrud.UpdateData(image_url, title, content, category, id)
            return res.redirect("/admindashboard")
        } catch (error) {
           console.log(error.message)
           throw error.message
        }
    }

    async Delete(req, res){
        try {
            const {id}= req.params
            const data= await DataCrud.DeleteData(id)
            return res.redirect("/admindashboard")
        } catch (error) {
           console.log(error.message)
           throw error.message 
        }
    }
    async DisplayComment(req, res){
        try {
            const {comment}= req.body
            const userid= req.session.userInfo.userid
            const {dataid}= req.params
            const result = await DataCrud.UserComment(userid, dataid, comment)
            return res.json("commented success")
            
        } catch (error) {
            console.log( error.message)
            throw error
        }
    }

}

module.exports= new DataController()