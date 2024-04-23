const express = require("express");
const router = express.Router();
// express router helps in restructure/segrigation of routes 


const wrapAsync = require("../utils/wrapAsync.js");

const Listing = require("../Models/listing.js");
const {isLoggedIn, isOwner, validateListing} = require("../middleware.js")

// controllers
const listingController = require("../controllers/listing.js");


const multer = require('multer');
const {storage} = require("../cloudConfig.js");
const upload = multer({storage});



// i guess this is been created somewhere else with require
// const validateListing = (req, res, next) => {
//     let {error} = listingSchema.validate(req.body);
//     console.log(result);
//     if(error){
//       let errMsg = error.details.map((el) => el.message) .join(",");
//       throw new ExpressError(400, errMsg );
//     }else{
//       next();
//     }
//   }


//Index Route
//Create Route
router.route("/")
.get( wrapAsync(listingController.index))
.post(isLoggedIn, upload.single('listing[image]'), validateListing, wrapAsync( listingController.createListing)
);


 //New Route
router.get("/new",isLoggedIn, listingController.renderNewForm);
  
//Show Route
//Update Route
//Delete Route
router.route("/:id")
.get(wrapAsync( listingController.showListing))
.put(isLoggedIn, isOwner, upload.single('listing[image]'), validateListing, wrapAsync(listingController.updateListing))
.delete(isLoggedIn,isOwner,  wrapAsync(listingController.destroyListing));


  //Edit Route
  router.get("/:id/edit", isLoggedIn,isOwner, wrapAsync(listingController.editListing));
  


  module.exports = router;