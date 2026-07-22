
const DataCrud= require("../model/data")




class AllGetRequests{

    // admin dashboard
    async AdminLogin(req, res){
        const adminErrorLogin= req.session.adminLoginError
        req.session.adminLoginError= null
        const adminPasswordError=  req.session.adminPasswordError
        req.session.adminPasswordError= null
         const unauthorized=  req.session.notPermitted
         req.session.adminLoginSuccess= null
        console.log(req.session.userInfo)
        res.render("pages/admin/adminLogin",
        {
            layout:"layouts/admin/adminAuthLayout",
            adminErrorLogin,
            adminPasswordError,
            unauthorized
        })
    }
      async Admin(req, res){ 
        const result= await DataCrud.DisplayData()
        res.render("pages/admin/admindashboard", {
            layout:"layouts/admin/adminLayout",
            result
        })
    }


    // user dashboard
    async Landing(req, res){
        const result= req.session?.userInfo
        res.render("pages/landing",{
            result
        })
    }
    async Login(req, res){
        const incorrectEmail= req.session.incorrectEmail
        req.session.incorrectEmail= null
        const incorrectPassword=  req.session.incorrectPassword
         req.session.incorrectPassword= null
        res.render("pages/login",{
            layout:"layouts/authLayouts",
            incorrectEmail,
            incorrectPassword
        })
    }
    async Signup(req, res){
        const detailsTaken= req.session.detailsTaken
        req.session.detailsTaken= null
        res.render("pages/signup", {layout:"layouts/authLayouts", detailsTaken})
    }
    async Homepage(req,res){
        const result= await DataCrud.DisplayData()
           const randomFive= result.sort(()=>{
            return Math.random()- 0.5
        }).slice(0,5)
        console.log(Math.floor(Math.random()*result.length))
            const randomCaurosel= result[Math.floor(Math.random()*result.length)]

        res.render("pages/homepage",{layout:"layouts/homepage", result, randomFive, randomCaurosel})
    }

    async SingleNewsDisplay(req, res){
        const {singleNewsId}= req.params
        const result= await DataCrud.SingleData(singleNewsId)
        const result2= await DataCrud.DisplayData()
        const randomFive= result2.sort(()=>{
            return Math.random()- 0.5
        }).slice(0,5)
        
        res.render("pages/singleNews",{layout:"layouts/homepage",result, randomFive})
    }
    async About(req, res){
        res.render("pages/about", {layout:"layouts/homepage"})
    }
    async World(req,res){
         const result= await DataCrud.DisplayData()
         const randomFive= result.sort(()=>{
            return Math.random()- 0.5
        }).slice(0,5)
        const randomCaurosel= result[Math.floor(Math.random()*result.length)]
        res.render("pages/world", {layout:"layouts/homepage", randomFive, result, randomCaurosel})
    }

    async Politics(req,res){
         const result= await DataCrud.DisplayData()
         const randomFive= result.sort(()=>{
            return Math.random()- 0.5
        }).slice(0,5)
        const randomCaurosel= result[Math.floor(Math.random()*result.length)]
        
        res.render("pages/politics", {layout:"layouts/homepage", randomFive, result, randomCaurosel})
    }

     async Entertainment(req,res){
         const result= await DataCrud.DisplayData()
         const randomFive= result.sort(()=>{
            return Math.random()- 0.5
        }).slice(0,5)
        const randomCaurosel= result[Math.floor(Math.random()*result.length)]
    
        res.render("pages/entertainment", {layout:"layouts/homepage", randomFive, result, randomCaurosel})
    }
     async Sports(req,res){
         const result= await DataCrud.DisplayData()
         const randomFive= result.sort(()=>{
            return Math.random()- 0.5
        }).slice(0,5)
        const randomCaurosel= result[Math.floor(Math.random()*result.length)]
        res.render("pages/sports", {layout:"layouts/homepage", randomFive, result, randomCaurosel})
    }

}

module.exports= new AllGetRequests()