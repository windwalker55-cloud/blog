const express= require("express")
const router = require("./routes/routes")
const app= express()
const dotenv=require("dotenv").config()
const PORT=process.env.PORT
const expressSession= require("express-session")
const db = require("./config/db")
const connectPgSimple= require("connect-pg-simple")(expressSession)
const expressEjsLayout=require("express-ejs-layouts")
const path=require("path")



// middleware
app.use(express.json())
app.use(express.urlencoded({
    extended:true
}))


// express session
app.use(expressSession({
    store: new connectPgSimple({
        pool: db,
        createTableIfMissing: true,
        errorLog:console.error
    }),
    secret:process.env.MYSECRET,
    resave:false,
    saveUninitialized:false,
    cookie:{
        maxAge:1000*60*60*24
    }
}))

app.use((req, res, next)=>{
    res.locals.userInfo=req.session.userInfo||null
    next()
})

// static file
app.use(express.static(path.join(__dirname, "src/public")))

// ejs
app.set("view engine","ejs")
app.set("views", path.join(__dirname, "src/views"))
app.use(expressEjsLayout)
app.set("layout", "layouts/layout")


app.use(router)
app.listen(PORT,  ()=>{
    console.log(`saver running at port ${PORT}`)
})