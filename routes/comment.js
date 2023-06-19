const express=require('express');
const router=express.Router();

const commentcontroller=require('../controllers/comments_controller');

router.post('/create',commentcontroller.create);

router.get('/destroy/:id',commentcontroller.destroy);


module.exports=router;