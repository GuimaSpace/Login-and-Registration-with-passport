const express = require("express")
const router = express.Router()
const {uLogged} = require("../helpers/uLogged")

router.get('/profile', uLogged, (req,res) =>{
    res.render("User/profile", {
        name: req.user.User_Name
    })
})









module.exports = router