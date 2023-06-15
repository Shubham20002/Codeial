const express=require('express');
const router=express.Router();

const postcontroller=require('../controllers/post_controller');

router.post('/create',postcontroller.createpost);


module.exports=router;