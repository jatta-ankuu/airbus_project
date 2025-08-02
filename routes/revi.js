const express= require("express");
const router = express.Router();
const wrap= require("../utils/wrap.js");
const {islogin} = require("../middleware.js");

const review=require("../controller/review.js");

// review route
router.get("/listed/:id/review", islogin,review.reviewpage);

//Add review
router.post("/listed/update/:_id/reviewd",wrap(review.reviewadd));

//Delete review
router.delete("/listed/:_id/delete/:reviewId", wrap(review.destroyreview));
 
module.exports = router;