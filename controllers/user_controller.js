const User=require('../models/user');

module.exports.profile=function(req,res){
   User.findById(req.params.id,function(err,user){
      return res.render('user_profile',{
         title:"user_profile",
         user_profile:user
      })
   }) 
}

module.exports.update=function(req,res){

   if(req.user.id==req.params.id){
      User.findByIdAndUpdate(req.params.id,req.body,function(err,user){
         return res.redirect('back');
      })
   }
   else{
      return res.status(401).send('unauthorized');
   }
}

module.exports.signup=function(req,res){
   //if user is already signed in then he will not access user/signup
   if(req.isAuthenticated()){
      return res.redirect('/user/profile');
   }
   return res.render('signup',{
      title:"sign-up"
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
            
       return res.redirect('/user/signup')
       
         })
      }
      //if user is already present then it will back to same page
      else{
         return res.redirect('back');
      }
   });
}

module.exports.createsession=function(req,res){
   req.flash('success','you have logged in successfully');
   return res.redirect('/');
}

module.exports.destroysession=function(req, res, next) {
   
   req.logout(function(err,) {
     if (err) { return next(err);
       }
       req.flash('success','you have logged out successfully');
     res.redirect('/');
   });

  

 }