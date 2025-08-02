const express= require("express");
const router = express.Router();
const user = require("../models/user.js");
const wrap= require("../utils/wrap.js");
const passport = require("passport");
const {redirecturl,islogin} = require("../middleware.js");

const userr= require("../controller/user.js");
router.get("/signup", userr.signform);

router.post("/signupp", userr.signup);

router.get("/login",userr.loginform);

router.post("/loginn",
   redirecturl,
     passport.authenticate("local",
        {
    failureRedirect:"/login",
    failureFlash: true,
}),userr.loggedin);

router.get("/logout", userr.logout);
module.exports = router;