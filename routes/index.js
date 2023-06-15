const express=require('express');

const router=express.Router();
const passport=require('passport');


const homecontroller=require('../controllers/home_controller');

router.get('/',passport.checkAuthentication,homecontroller.home);

router.use('/user',require('./user'));

router.use('/post',require('./post'));

// console.log("router loaded");
module.exports=router;