const Post=require('../models/post');
const Comment=require('../models/comment');

// module.exports.createpost=function(req,res){
//     // console.log(req.body,req.user._id);
//     Post.create({
//         content:req.body.content,
//         user:req.user._id
//     },function(err,post){
//         if(err){console.log("error in creating a post",err);return;}
//         return res.redirect('back');
//     });
   
// };

//converted above code into async await
module.exports.createpost= async function(req,res){
    // console.log(req.body,req.user._id);
    try{
        await Post.create({
            content:req.body.content,
            user:req.user._id
        });
        req.flash("success",'post created');
        return res.redirect('back');
    }catch(err){
       console.log("creating post");
       return;
    }
    
   
};

module.exports.destroy=function(req,res){
    Post.findById(req.params.id,function(err,post){
        //.d means converting the object id into string
        if(post.user ==req.user.id){
            post.remove();

            Comment.deleteMany({post:req.params.id},function(err){
                req.flash("success",'post deleted successfully');
                return res.redirect('back');
            });
        }
        else{
            return res.redirect('back');
        }
    });
}