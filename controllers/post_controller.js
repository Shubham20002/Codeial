const Post=require('../models/post');

module.exports.createpost=function(req,res){
    // console.log(req.body,req.user._id);
    Post.create({
        content:req.body.content,
        user:req.user._id
    },function(err,post){
        if(err){console.log("error in creating a post",err);return;}
        return res.redirect('back');
    });

   
}