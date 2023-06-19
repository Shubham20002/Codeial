const post=require('../models/post');
const User=require('../models/user');
module.exports.home=function(req,res){
    // return res.end ('<h1>Express is up for codeial</h1>');
    // res.cookie('user_id','25');
    // post.find({},function(err,posts){
    //     return res.render('home',{
    //     title:"home page",
    //     posts:posts
    //     })
    // })

    //populate the user for each post
    post.find({})
    .populate('user')
    .populate({
        path:'comments',
        populate:{
            path:'user'
        }
    })
    .exec(function(err,posts){
        User.find({},function(err,users){
            return res.render('home',{
                title:"Codeial | Home",
                posts:posts,
                all_users:users
            });
        });
       
    });
    
}


//module.exports.actionname=function(req,res){}