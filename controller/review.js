const listt = require("../models/listening.js");
const rev = require("../models/review.js");

module.exports.reviewpage=(req,res)=>{
    let{id}=req.params;
res.render("listings/review.ejs",{id});
};
module.exports.reviewadd=async(req,res)=>{
    let {_id}= req.params;
let list= await listt.findById(_id);
const rev1 = new rev(req.body.rating);
rev1.author= req.user._id;
 list.review.push(rev1);
 list.save();
 rev1.save();
 req.flash("success", "Review Added...!");
 res.redirect(`/lists/${_id}`);
};
module.exports.destroyreview=async(req,res)=>{
let {_id,reviewId }= req.params;
await listt.findByIdAndUpdate(_id, {$pull:{review: reviewId}});
await rev.findByIdAndDelete(reviewId);
req.flash("success","Review Deleted successfully..!");
res.redirect(`/lists/${_id}`);
};