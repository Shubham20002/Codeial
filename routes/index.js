const express=require('express');

const router=express.Router();
const homecontroller=require('../controllers/home_controller');

router.get('/',homecontroller.home);

console.log("router loaded");
module.exports=router;