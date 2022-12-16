// Modules
const express = require("express")
const handlebars = require("express-handlebars")
const session = require("express-session")
const app = express()
const path = require("path")
const flash = require("connect-flash")
const passport = require("passport")
require("./config/auth")(passport)
//RoutesExports
const DefaultRoutes = require("./routes/Routes")
const UserRoutes = require("./routes/UserRoutes")
const AdminRoutes = require("./routes/AdminRoute")
require('dotenv/config')
//Config
    //Sessão
    app.use(session({
        secret: process.env.SESSION_SECRET,
        resave: true,
        saveUninitialized: true
    }))

    app.use(passport.initialize())
    app.use(passport.session())
    app.use(flash())

    //Middleware
    app.use((req,res,next) =>{
        res.locals.success_msg = req.flash("success_msg")
        res.locals.error_msg = req.flash("error_msg")
        res.locals.user = req.user || null
        next()
    })
    //BodyParser
    app.use(express.urlencoded({extended:false}))
    app.use(express.json())
    //Handlebars
    app.engine('handlebars', handlebars.engine({defaultLayout: 'main'}))
    app.set('view engine', 'handlebars')
    //Public Assets
    app.use(express.static(path.join(__dirname,"public")))

//Routes
app.use('/', DefaultRoutes)
app.use('/User/', UserRoutes)
app.use('/Admin/', AdminRoutes)


app.listen(process.env.WEB_PORT, ()=>{
    console.log("Servidor iniciado na porta: " + process.env.WEB_PORT)
})