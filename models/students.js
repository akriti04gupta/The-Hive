const mongoose= require("mongoose");
const Schema=mongoose.Schema;
const passportLocalMongoose=require("passport-local-mongoose");

const studentsSchema=new mongoose.Schema(
    {
        email:{
            type: String,
            required: true,
        },
    }
);

studentsSchema.plugin(passportLocalMongoose);

const Students = mongoose.model("Students",studentsSchema);
module.exports=Students;