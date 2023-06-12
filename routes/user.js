const express=require('express');
const router=express.Router();
const passport=require('passport');

const usercontroller=require('../controllers/user_controller');

router.get('/profile',passport.checkAuthentication,usercontroller.profile);


router.get('/signup',usercontroller.signup);


router.post('/create',usercontroller.create);
//use passport as middleware to authenticate
router.post('/create-session',passport.authenticate(
    'local',{failureredirect:'user/siginup'}
),usercontroller.createsession)

router.get('/sign-out',usercontroller.destroysession);

module.exports=router;