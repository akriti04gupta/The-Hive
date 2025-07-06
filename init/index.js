const mongoose = require('mongoose');
const initData=require("./data.js");
const Societies = require('../models/societies.js');

main()
.then(()=>{
    console.log("connected to DB");
})
.catch((err) => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/societies');
}
//function to initialise database
const initDB = async () => {
    await Societies.deleteMany({});
    await Societies.insertMany(initData.data);
    console.log("data was initialized");
  };
  
  initDB();