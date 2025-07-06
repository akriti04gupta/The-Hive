const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const societiesSchema=new Schema({
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
    category:String,
    logo:
    {
        url:String,
        filename:String,
    },
    chairperson:
    {
        type:String,
    },
    events:[
        {
            type: Schema.Types.ObjectId,
            ref:"Events",
        }
    ],
    owner:
    {
        type: Schema.Types.ObjectId,
        ref:"Students",
    }
});

const Societies = mongoose.model("Societies",societiesSchema);
module.exports=Societies;