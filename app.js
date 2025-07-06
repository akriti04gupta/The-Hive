if(process.env.NODE_ENV != "production")
{
    require("dotenv").config();
}
const express=require("express");
const app=express();
const mongoose=require("mongoose");
const Societies = require('./models/societies.js');
const Events = require('./models/events.js');
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const { request } = require("http");
const societies=require("./routes/societies.js");
const session=require("express-session");
const MongoStore=require("connect-mongo");
const flash=require("connect-flash");
const passport=require("passport");
const LocalStrategy=require("passport-local").Strategy;
const Students = require('./models/students.js');
const multer  = require('multer')

const dbUrl= process.env.ATLAS_DB;

const store= MongoStore.create({
    mongoUrl:dbUrl,
    crypto:{
        secret:process.env.SECRECT
    },
    touchAfter: 24*3600,
});
store.on("error",(err)=>{
    console.log("ERROR IN MONGO SESSION STORE",err);
});

//setting up the session
const sessionOptions={
    store : store,
    secret: process.env.SECRECT,
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now()+ 7*24*60*60*1000,
        maxAge: 7*24*60*60*1000,
        httpOnly: true
    }
};



app.use(session(sessionOptions));
app.use(flash());

//authentication
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(Students.authenticate()));
passport.serializeUser(Students.serializeUser());
passport.deserializeUser(Students.deserializeUser());

//flash setup
app.use((req,res,next)=> {
    res.locals.success=req.flash("success");
    res.locals.error=req.flash("error");
    res.locals.currUser=req.user;
    next();
});



main()
    .then(()=>{
    console.log("connected to DB")})
    .catch((err)=>{
        console.log(err)});
async function main()
{
    await mongoose.connect(dbUrl);
}

app.set("view engine","ejs");
app.set("views", path.join(__dirname,"views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs",ejsMate);
app.use(express.static(path.join(__dirname,"/public")));

app.get("/",(req,res)=>{
    res.render("dashboard.ejs")
}); 

app.use("/societies",societies);

//index events routing
app.get("/events",async (req,res)=>{
    const allEvents=await Events.find({});
    res.render("events/index.ejs",{allEvents});
});

//events routing
app.get("/societies/:id/newevent",async(req,res)=>{
    let {id}=req.params;
    const data= await Societies.findById(id);
    res.render("events/addevent.ejs",{data})
});
app.post("/societies/:id/newevent" ,async (req,res)=>{
    let {id}=req.params;
    const society=await Societies.findById(id); 
    console.log(society);
    console.log(req.body);
    console.log(req.body.event);
    let {name,description,addedBy}=req.body.event;
    const newEvent=new Events(req.body.event);
    society.events.push(newEvent);
    await newEvent.save();
    await society.save();
    req.flash("success","Your details have been updated!");
    res.redirect("/events");
});
//view events routing
app.get("/events/:id", async (req,res)=>{
    let {id}=req.params;
    const data=await Events.findById(id);
    console.log(data);
    if(!data)
    {
        req.flash("error","Snap !! Society you requested does not exist!");
        res.redirect("/societies");
    }
    res.render("events/show.ejs",{ event: data});
});


// signup routing
app.get("/signup",(req,res)=>{
    res.render("students/signup.ejs");
});
app.post("/signup", async (req,res)=>{
    try{
        let {username,email,password}=req.body;
        const newStudent=new Students({username,email});
        const student1=await Students.register(newStudent,password);
        console.log(student1);
        req.login(student1,(err)=>{
            if(err)
            {
                return next(err);
            }
        req.flash("success","Welcome to Hive!");
        res.redirect("/societies");
        });
        }
        catch(e)
        {
            req.flash("error",e.message);
            res.redirect("/signup"); 
        }

});

//login routing 
app.get("/login",(req,res)=>{
    res.render("students/login.ejs");
});
app.post("/login", passport.authenticate("local",{failureRedirect:"/login",failureFlash:true}) ,async (req,res)=>{
        req.flash("success","Welcome back to Hive!");
        res.redirect("/");
});

//logout routing
app.get("/logout",(req,res)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
    req.flash("success","You are loggged out now!");
    res.redirect("/");
    })
})

app.listen(8080,()=>{
    console.log("server is listening");
})


// app.get("/testSociety",async(req,res)=>{
//         const s1=new Societies({
//             name:"soiety",
//             description:"conducton event",
//             category:"tech",
//         })
//         await s1.save();
//         console.log("sample was saved");
//         res.send("connection succesful");
//     });
