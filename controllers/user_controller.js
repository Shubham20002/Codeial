const User=require('../models/user');

module.exports.profile=function(req,res){
   return res.render('user_profile',{
      title:"user_profile"
   })
}

module.exports.signup=function(req,res){
   return res.render('signup',{
      title:"user_profile"
   })
}

module.exports.create=function(req,res){
   // console.log(req.body);
   //if password and confirm password is not same then this will run
   if(req.body.password != req.body.confirm_password){
      return res.redirect('back');
   }
   //always run checking user is already in db or not
   User.findOne({email:req.body.email},function(err,user){
      if(err){console.log("error in finding user in sigining up");return}
    //if user is not present in db then it will added in db
      if(!user){
         User.create(req.body,function(err,user){
            if(err){console.log("error in finding user in sigining up");return}
            window.alert("user added");
       return res.redirect('/user/signup')
       
         })
      }
      //if user is already present then it will back to same page
      else{
         return res.redirect('back');
      }
   });
}