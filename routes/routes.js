const router = require("express").Router()
const UserController= require("../controller/controller")
const middleware = require("../middleware/middleware")
const DataController= require("../controller/data")
const page = require("../controller/page")



router.post("/signup", UserController.Signup)
router.post("/login", UserController.Login)
router.post("/updateusername", UserController.UpdateUsername)
router.post("/updatepassword", UserController.UpdatePassword)
router.post("/delete", UserController.DeleteUser)
router.post('/createdata', DataController.Create)
router.post('/updatedata/:id', DataController.Update)
router.post('/deletedata/:id', DataController.Delete)
router.post('/comment/:dataid', DataController.DisplayComment)
router.post("/adminlogin", UserController.AdminLogin)


// get requests
router.get("/admin/login", middleware.RedirectAdminIfAutenticated,page.AdminLogin)
router.get('/admindashboard', middleware.AutenticateAdminIfNoToken, page.Admin)
router.get("/admin/logout", UserController.AdminLogout)


router.get("/", page.Landing)
router.get("/login", middleware.RedirectIfAutentiated,page.Login)
router.get("/signup", middleware.RedirectIfAutentiated,page.Signup)
router.get('/logout', UserController.Logout)
router.get("/homepage", middleware.AutenticateUserIfNoToken, page.Homepage)
router.get("/news/:singleNewsId", middleware.AutenticateUserIfNoToken, page.SingleNewsDisplay)
router.get("/about", middleware.AutenticateUserIfNoToken, page.About)
router.get("/world", middleware.AutenticateUserIfNoToken, page.World)
router.get("/politics", middleware.AutenticateUserIfNoToken, page.Politics)
router.get("/entertainment", middleware.AutenticateUserIfNoToken, page.Entertainment)
router.get("/sports", middleware.AutenticateUserIfNoToken, page.Sports)

module.exports= router