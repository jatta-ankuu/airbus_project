const listt = require("./models/listening.js")

const islogin = (req,res,next)=>{
    if(!req.isAuthenticated()){
        req.session.redirectUrl = req.originalUrl;
        console.log(req.session.redirectUrl);
        req.flash("error","To perform that,You must be logged in");
    return res.redirect("/login");
    };
    next();
};

const redirecturl =(req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirecturl=req.session.redirectUrl;
    };
    next();
};
const isowner = async(req ,res, next)=>{
     let {id}= req.params;
    const currlist = await listt.findById(id);
    if(!currlist.owner.equals(res.locals.currUser._id)){
      
            req.flash("error", "You does not have access to edit the information");
       return res.redirect("/lists");
    };
    next();
};

module.exports = {
    islogin,
    redirecturl,
    isowner
};