const listt = require("../models/listening.js");
const rev = require("../models/review.js");

module.exports.index =async(req, res)=>{
let alldata = await listt.find({});
res.render("listings/alllists.ejs",{alldata});
};

module.exports.read=async(req,res)=>{
    let {id}= req.params;
    let singdata = await listt.findById(id).populate({
      path:"review",
      populate:{
        path:"author"
      }
    }).populate("owner");
    if(!singdata){
      req.flash("error","OOPS...!, Your data not found");
       return res.redirect("/lists");
    };
    res.render("listings/allshow.ejs", {singdata});
};

module.exports.new=(req,res)=>{
res.render("listings/fornew.ejs");
};

module.exports.added=async (req,res)=>{
  let url= req.file.path;
  let filename= req.file.filename;
    const newdata = new listt(req.body.listed);
    newdata.owner = req.user._id;
    newdata.image ={url, filename};
   await newdata.save();
   req.flash("success", "Hureyy..!, You added a new place");
 res.redirect("/lists");

};

module.exports.edit=async(req,res)=>{
    let {id}= req.params;
  let editdata=  await listt.findById(id);
  let pixelimg = editdata.image.url;
  let finalimg = pixelimg.replace("/upload","/upload/w_250");
  res.render("listings/edit.ejs",{editdata, finalimg});
};

module.exports.edited=async(req,res)=>{
    let {id}= req.params;
    let editted= await listt.findByIdAndUpdate(id,{...req.body.data});
    if(typeof req.file != "undefined"){
    let url= req.file.path;
    let filename=req.file.filename;
    editted.image={url,filename};
    await editted.save();
    }
     req.flash("success", "Updated....");
res.redirect("/lists");
};

module.exports.delete= async(req,res)=>{
    let {id}= req.params;
   await listt.findByIdAndDelete(id);
   req.flash("success", "Deleted..:(");
   res.redirect("/lists");
};
