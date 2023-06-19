const express=require('express');
const app=express();
const port=7000;
const expressLayout=require('express-ejs-layouts');
const db=require('./config/mongoose');
const cookieParser=require('cookie-parser');
//used for seeeion cookie
const session= require('express-session');
const passport=require('passport');
const passportLocal=require('./config/passport-local-strategy');
const MongoStore=require('connect-mongo');
const flash=require('connect-flash');
const customMware=require('./config/middleware');


app.use(express.urlencoded({ extended: false }));
app.use(express.static('./assets'));
app.use(cookieParser());

app.use(expressLayout);
 //extract the style and script from sub pages to layouts
 app.set('layout extractStyles', true);
 app.set('layout extractScript',true);


//setup view engine
app.set("view engine",'ejs');
app.set("views","./views");

//mongo store is used to store the session cookie in the db
app.use(session({
    name:'codeial',
    //todo change the secret before deployement in production mode
    secret: 'blahsomething',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*60)
    },
    // store:new MongoStore(
    //     {
    //         mongooseConnection:db,
    //         autoRemove:'disabled'
    //     },
    //     function(err){
    //         console.log(err || 'connect-mongodb setup ok');
    //     }
    // )
    //store keyword is used to store cookie in db
    store:MongoStore.create({ mongoUrl: 'mongodb://localhost/codial_development' })
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);
app.use(flash());
app.use(customMware.setFlash);

//use express router
app.use('/',require('./routes'));

app.listen(port,function(err){
    if(err){
        console.log(`Error in running server :${err}`);
    }
    console.log(`server is running on port:${port}`);
})