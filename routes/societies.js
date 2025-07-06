const express=require("express");
const router=express.Router();
const Societies = require('../models/societies.js');
const multer  = require('multer')
const {storage}=require("../cloudConfig.js")
const upload = multer({ storage })

// index societies routing with search & filter
router.get("/", async (req, res) => {
    const { search = "", category = "" } = req.query;

    // Build query object
    let query = {};

    if (search) {
        query.name = { $regex: search, $options: "i" }; // case-insensitive search on name
    }

    if (category) {
        query.category = category;
    }

    // Fetch filtered data
    const allSocieties = await Societies.find(query);

    // Pass search and category back to view for retaining input
    res.render("societies/index.ejs", {
        allSocieties,
        search,
        category
    });
});


//new societies routing
router.get("/new",async(req,res)=>{
    if(!req.isAuthenticated())
    {
        req.flash("error","You must be signed-in to add your society");
        return res.redirect("/signup");
    }
    res.render("societies/new.ejs")
});
//create societies routing
router.post("/",upload.single('logo'),async(req,res)=>{
    const society=req.body.society;
    let url=req.file.path;
    let filename=req.file.filename;
    const newSociety=new Societies(society);
    newSociety.owner=req.user._id;
    newSociety.logo={url,filename};
    await newSociety.save();
    console.log(society);
    req.flash("success","Congratulations, Your society has been added!");
    res.redirect("/societies");
});

//edit routing
router.get("/:id/edit",async(req,res)=>{
    let {id}=req.params;
    const data=await Societies.findById(id);
    if(!data)
        {
            req.flash("error","Ahh, The society you requested does not exist!");
            res.redirect("/societies");
        }
    res.render("societies/edit.ejs",{data});
});

// update routing
router.put("/:id",upload.single('logo'),async(req,res)=>{
    let {id}=req.params;
    const data=await Societies.findById(id);
    if(!data.owner.equals(res.locals.currUser._id))
    {
        req.flash("error","You dont have access to edit");
        res.redirect(`/societies/${id}`);   
    }
    let society=await Societies.findByIdAndUpdate(id,{...req.body.society},{ new: true });
    if(typeof req.file !== "undefined")
    {
        let url=req.file.path;
        let filename=req.file.filename;
        society.logo={url,filename};
        await society.save();
    }
    req.flash("success","Congratulations, Your society details has been updated!");
    res.redirect(`/societies/${id}`);   
});

//delete route
router.delete("/:id",async(req,res)=>{
    let{id}=req.params;
    const data=await Societies.findById(id);
    if(!data.owner.equals(res.locals.currUser._id))
    {
        req.flash("error","You dont have access to edit");
        res.redirect(`/societies/${id}`);   
    }
    let deletedSociety = await Societies.findByIdAndDelete(id);
    console.log(deletedSociety);
    req.flash("success","Sorry , Your society has been removed!");
    res.redirect("/societies");
});

//view routing
router.get("/:id", async (req,res)=>{
    let {id}=req.params;
    const data=await Societies.findById(id).populate("owner");
    console.log(data);
    if(!data)
    {
        req.flash("error","Snap !! Society you requested does not exist!");
        res.redirect("/socieeties");
    }
    res.render("societies/show.ejs",{data});
});

module.exports=router;