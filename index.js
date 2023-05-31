const express=require('express');
const app=express();
const port=8000;
const expressLayout=require('express-ejs-layouts');


app.use(express.static('./assets'));

app.use(expressLayout);
 //extract the style and script from sub pages to layouts
 app.set('layout extractStyles', true);
 app.set('layout extractScript',true);

//use express router
app.use('/',require('./routes'));

//setup view engine
app.set("view engine",'ejs');
app.set("views","./views");

app.listen(port,function(err){
    if(err){
        console.log(`Error in running server :${err}`);
    }
    console.log(`server is running on port:${port}`);
})