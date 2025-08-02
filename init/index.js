const mongoose = require("mongoose");
const initdata = require("./data.js");
const list = require("../models/listening.js");
const User = require("../models/user.js");


main()
.then(()=>{
    console.log("connect successfull")
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/airbus');
};

 const filldata = async()=>{
  await list.deleteMany({});
  console.log("fil data is called");
initdata.data = initdata.data.map((obj)=>({...obj, owner:"68834543aeeb1be88f145ea6"}));
await list.insertMany(initdata.data);

 };
 
 filldata();
