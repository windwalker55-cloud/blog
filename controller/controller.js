const User = require("../model/user");
const bcrypt= require("bcrypt")

class UserController{

    // admin 

    async AdminLogin(req, res){
        try {
            const {email, password}= req.body
            const result= await User.Login(email)
            console.log(result)
            if(!result){
                req.session.adminLoginError= "Incorrect email"
                return res.redirect("/admin/login")
            }
            const checkPassword= await  result.password
            const comparePassword= await bcrypt.compare(password, checkPassword)
            if(!comparePassword){
                req.session.adminPasswordError= "Incorrect password"
                return res.redirect("/admin/login")
            }
            if(result.role !== "admin"){
                req.session.notPermitted="Unauthorized"
                return res.redirect("/admin/login")
            }

            req.session.adminInfo=result
            
            return res.redirect("/admindashboard")
        } catch (error) {
            console.log(error.message)
            throw error.message
        }
    }

    async AdminLogout(req,res){
        try {
            req.session.destroy(err=>{
                if(err) return res.json("saver error", err)
            })
            res.clearCookie("connect.sid")
            return res.redirect("/admin/login")
            
        } catch (error) {
            console.log(error.message)
        }

    }

    // user

    async Signup(req, res){
    try {
        const {email, username, password}= req.body
          const checkDetails= await User.Login(email)
        if(checkDetails){
            req.session.detailsTaken= "Username or Email taken"
            return res.redirect("/signup")
        }
        const result= await User.Signup(email, username, password)
        return res.redirect("/login")

        } catch (error) {
            console.log( error.message)
            throw error
        }

    }

    async Login(req, res){
        try {
            const {email,password}= req.body
            const result= await User.Login(email)
            if(!result){
                req.session.incorrectEmail= "invalid Credentials"
                 return res.redirect("/login")
            }
            const comparePassword= await bcrypt.compare(password, result.password)
            if(!comparePassword){
                req.session.incorrectPassword="invalid Credentials"
                return res.redirect("/login")
            }
            req.session.userInfo = result
            return res.redirect("/homepage",)
            
        } catch (error) {
            throw error
            console.log( error.message)
        }
    }
    
    async UpdateUsername(req, res){
        try {
            const {username}= req.body
            const id= req.session.userInfo?.userid
            const result = await User.UpdateUsername(username, id)
            if(username==result.username) return res.json("username taken")
            req.session.userid.username= username
           return res.status(200).json("user updated success")

        } catch (error) {
            throw error
            console.log( error)
        }
    }

    async UpdatePassword(req, res){
        try {
            const{password}= req.body
            const id= req.session.userInfo.userid
            const result = await User.UpdatePassword(password, id)
            if(password=== req.session.userInfo.password) return res.json("cannot update same password")
            req.session.userInfo.password= password
            return res.json("password updated success")
        } catch (error) {
            throw error.message
            console.log( error.message)
        }
    }

    async DeleteUser(req, res){
        try {
            
            const id= req.session.userInfo.userid
            const result= await User.DeleteUser(id)
           if(result) console.log("user deleted")
            return res.json("user deleted")
        } catch (error) {
            console.log(error.message)
            throw error
        }
    }

    async Logout(req, res){
        try {
            req.session.destroy(err=>{
                if(err) return res.json("saver error", err)
            })
            res.clearCookie("connect.sid")
            return res.redirect("/login")
            
        } catch (error) {
            console.log(error.message)
        }
    }
    
}

module.exports= new UserController()