if(process.env.NODE_ENV !="production"){
    require('dotenv').config();
}

const express = require("express");
const mongoose = require("mongoose");
const app = express();
const listt = require("./models/listening.js");
const rev = require("./models/review.js");
const path = require("path");
const ejsMate = require("ejs-mate");
const wrap= require("./utils/wrap.js");
const expresserror= require("./utils/expresserr.js");
const method = require("method-override");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const passport = require("passport");
const local = require("passport-local");
const user = require("./models/user.js");

app.set("view engine","ejs");
app.set("views", path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, "public")));
app.use(method("_method"));
app.engine("ejs", ejsMate);


let mongURL= process.env.DB_URL;

const store = MongoStore.create({
    mongoUrl:mongURL,
    crypto:{
        secret:process.env.SECRET,
    },
    touchAfter: 24*3600,
});
store.on("error",()=>{
    console.log("erroe in mongo session", error)
});

const sessionopt= {
   store,
    secret : process.env.SECRET,
    resave: false,
    saveUninitialized: true,
}

app.use(session(sessionopt));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

passport.use(new local(user.authenticate()));
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());

app.use((req,res,next)=>{
    res.locals.success = req.flash("success");
     res.locals.error = req.flash("error");
     res.locals.currUser = req.user;
    next();
});


const listroute= require("./routes/lists.js");
const reviroute = require("./routes/revi.js");
const userroute = require("./routes/userroute.js");



main()
.then(()=>{
    console.log("connect successfull")
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect(mongURL);
};


app.use("/",listroute);
app.use("/",reviroute);
app.use("/", userroute);

app.all("*",(req,res,next)=>{
    next(new expresserror(404,"page not found"));
});

app.use((err, req, res, next) => {
let{statusCode=500, message="something went wrong"}= err;
 res.render("listings/erroe.ejs",{message});
});

app.listen("8080",()=>{
    console.log("Server is clicked");
});
