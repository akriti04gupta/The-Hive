const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const eventsSchema=new Schema({
    name:
    {
        type : String,
        required: true,
    },
    description:
    {
        type : String,
        required: true,
    },
    addedBy:
    {
        type:String,
    },
    date:
    {
        type:Date,
        default:Date.now()
    },
    location:
    {
        type:String
    },
    banner:
    {
        type:String,
        set : (v)=> v===""? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlRrZmUNxUVI27-_NutmPfBjhcRbr3OUScIg&s" :v,
        default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlRrZmUNxUVI27-_NutmPfBjhcRbr3OUScIg&s",
    },
});

const Events = mongoose.model("Events",eventsSchema);
module.exports=Events;