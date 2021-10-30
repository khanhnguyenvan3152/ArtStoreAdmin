var express = require('express');
var router = express.Router();
const app = express();
const admin = require('../models/admin')
app.set('layout',)
//GET LOGIN, SIGNUP PAGE
router.get('/',function(req,res,next){
    if(req.cookies.loggedIn)
    {
        res.redirect('');
    } else res.redirect('auth/login');
})

router.get('/login',function(req,res,next){
    res.render('login',{layout:false});
})
router.post('/login',function(req,res,next){
    let username = req.username;
    let password = req.password;
    admin.findOne({username:username,password:password}).then(result=>{
        res.cookie("loggedIn",true, { expires: new Date(Date.now() + 900000), httpOnly: true });
        res.redirect("/");
    }).catch(err=>{
        console.log(err);
    })
})
router.get('/signup', async function(req,res,next){
    // const newadmin = new admin();
    // newadmin.email = "abc@gmail.com";
    // newadmin.password = 123;
    // await newadmin.save();
    // res.send(`sign up successfully`)
})
module.exports = router;