const express = require("express");
const router = express.Router();
const listt = require("../models/listening.js");
const rev = require("../models/review.js");
const wrap= require("../utils/wrap.js");
const {islogin,redirecturl,isowner} =require("../middleware.js");
const control= require("../controller/listings.js");
const multer =require("multer");
const {storage}=require("../cloudconfig.js");
const upload= multer({storage});

//INDEX ROUTE
router.get("/lista",wrap(control.index));

//READ ROUTER
router.get("/lists/:id", wrap(control.read));

//NEW ROUTE
router.get("/list/new",islogin,control.new);

//DATA ADDED
router.post("/list/added",upload.single("listed[image]"), wrap(control.added));


//Data edit
router.get("/list/:id/edit",islogin,isowner, wrap(control.edit));

//Edited Data
router.post("/lists/:id/updated",upload.single("listed[image]"),wrap(control.edited));

//Delete Data
router.post("/list/:id/delete",islogin, wrap(control.delete));

module.exports= router;