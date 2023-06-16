const express=require('express');
const router=express.Router();

const commentcontroller=require('../controllers/comments_controller');

router.post('/create',commentcontroller.create);


module.exports=router;