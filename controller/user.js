const user = require("../models/user.js");
module.exports.signform=(req,res)=>{
    res.render("./userejs/signupfrom.ejs");
};
module.exports.signup=async(req,res)=>{
    try{
        let {Username:username, email,password}= req.body;
   
    const newuser = new user({username, email});
   let rejis=  await user.register(newuser, password);
   req.login(rejis,(err)=>{
    if(err){
        next(err);
    }
    req.flash("success", "Welcome To Your Profile..!");
    res.redirect("/lists");
   })
   
    }
    catch(err){
        req.flash("error", err.message);
        res.redirect("/signup");
    }
};
module.exports.loginform=(req,res)=>{
    res.render("./userejs/login.ejs");
};
module.exports.loggedin=(req,res)=>{
    req.flash("success","Welcome back..!");
    return res.redirect(res.locals.redirecturl || "/lists");
};
module.exports.logout=(req,res,next)=>{
    req.logOut((err)=>{
        if(err){
            next(err);
        }
        req.flash("success","You are logged out");
        res.redirect("/lists");
    })
};