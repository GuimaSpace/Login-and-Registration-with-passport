const express = require("express")
const router = express.Router()
const tb_User = require("../models/UserModel")
const bcrypt = require("bcryptjs")
const passport = require("passport")
require("../config/auth")(passport)


router.get('/',(req,res) =>{ res.render('index') })
router.post('/login-user/',(req, res, next)=>{
    passport.authenticate("local", {
        successRedirect: "/User/Profile",
        failureRedirect: "/"
    })
    (req, res, next)
})

router.post('/cad-user/',(req,res) =>{

var errors = []

if (!req.body.name || typeof req.body.name == undefined || typeof req.body.name == "") {
    errors.push({texto: "Campo nome não pode estar vazio!"})
}

if (!req.body.email || typeof req.body.email == undefined || typeof req.body.email == "") {
    errors.push({texto: "Campo email não pode estar vazio!"})
}
if (!req.body.senha || typeof req.body.senha == undefined || typeof req.body.senha == "") {
    errors.push({texto: "Campo senha não pode estar vazio!"})
}
if (!req.body.senhaconfirm || typeof req.body.senhaconfirm == undefined || typeof req.body.senhaconfirm == "") {
    errors.push({texto: "Campo Confirmar Senha não pode estar vazio!"})
}

if (req.body.senha.length < 6) {
    req.flash("error_msg", "A senha deve conter no mínimo 6 caracteres")
    res.redirect('/')
}

if (req.body.senha != req.body.senhaconfirm) {
    req.flash("error_msg", "As senhas não conferem!")
    res.redirect('/')
}


if (errors.length > 0) {
    req.flash("error_msg", "Todos os campos devem estar preenchidos")
    res.redirect('/')
}else{
    tb_User.findOne({where: {User_Email: req.body.email}}).then((usuario) =>{

        if (usuario) {
            req.flash("error_msg", "Esse Email já foi cadastrado em nosso sistema")
            res.redirect('/')
        }else{



            bcrypt.genSalt(10, (erro, salt) =>{
                UserPassword = req.body.senha

                bcrypt.hash(UserPassword, salt, (erro, hash) =>{
                    if (erro) {
                        req.flash("error_msg", "Ocorreu um erro na hora de encryptar suas informações")
                        res.redirect('/')
                    }

                    encryptedpass = hash
                    tb_User.create({
                        User_Name: req.body.name,
                        User_Email: req.body.email,
                        User_Password: encryptedpass
                    }).then(function(){
                        req.flash("success_msg", "Usuário cadastrado com sucesso.")
                        res.redirect('/')
                    }).catch(function(erro){
                        req.flash("error_msg", "Usuário não foi cadastrado com sucesso erro: " + erro)
                        res.redirect("/")
                    })

                })
            })
        }
    }).catch((err)=>{
        req.flash("error_msg", "Ocorreu um erro interno kkk: " + err)
        res.redirect("/")
    })
}


})






module.exports = router