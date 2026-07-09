class Middleware{

    // user
    async AutenticateUserIfNoToken(req, res, next){
        if(!req.session.userInfo){
          return  res.redirect("/login")
        }
        next()
    }

    async RedirectIfAutentiated(req, res, next){
        if(req.session.userInfo){
            return res.redirect("/homepage")
        }
        next()
    }


    // admin
    async AutenticateAdminIfNoToken(req, res ,next){
        if(!req.session.adminInfo){
           return res.redirect("/admin/login")
        }

        next()
    }

    async RedirectAdminIfAutenticated(req, res, next){
        if(req.session.adminInfo){
          return  res.redirect("/admindashboard")
        }
       next()
    }
}

module.exports= new Middleware