const express=require('express');
const router=express.Router();

const postcontroller=require('../controllers/post_controller');

router.get('/ad',postcontroller.ad);


module.exports=router;