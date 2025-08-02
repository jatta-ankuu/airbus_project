const mongoose = require("mongoose");
const Review = require("./review");
const schema = mongoose.Schema;
const rev = require("./review.js");


const listenschema = schema({
    title:{
        type:String,
        required: true
    },
    description:{
type: String,
    },
    image: {
      url:String,
      filename:String,
},
    price:{
        type: Number,
    },
    location:{
type: String,
    },
    country:{
        type: String,
    },
    review:[
    {
      type: schema.Types.ObjectId,
      ref:"Review",
    }
  ],
  owner:{
    type: schema.Types.ObjectId,
    ref:"User",
  },
});
listenschema.post("findOneAndDelete", async(listing)=>{
  console.log("called");
  if(listing){
await rev.deleteMany({_id: {$in: listing.review}});
  }
});


const listing = mongoose.model("listing", listenschema);
module.exports = listing;