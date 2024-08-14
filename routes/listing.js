const express = require("express");
const router = express.Router();
// express router helps in restructure/segrigation of routes 


const wrapAsync = require("../utils/wrapAsync.js");
const {isLoggedIn, isOwner, validateListing} = require("../middleware.js")
const listingController = require("../controllers/listing.js");
const multer = require('multer');
const {storage} = require("../cloudConfig.js");

const Listing = require("../Models/listing.js");


const upload = multer({storage});




//Index Route
//Create Route
// router.route("/")
// .get( wrapAsync(listingController.index))
// .post(isLoggedIn, upload.single('listing[image]'),validateListing, (req, res) => {res.send(req.file)});


//  //New Route
// router.get("/new",isLoggedIn, listingController.renderNewForm);
  
// //Show Route
// //Update Route
// //Delete Route
// router.route("/:id")
// .get(wrapAsync( listingController.showListing))
// .put(isLoggedIn, isOwner, upload.single('listing[image]'), validateListing, wrapAsync(listingController.updateListing))
// .delete(isLoggedIn,isOwner,  wrapAsync(listingController.destroyListing));


//   //Edit Route
//   router.get("/:id/edit", isLoggedIn,isOwner, wrapAsync(listingController.renderEditform));
  


//   module.exports = router;



// this is from cod

//Index Route
router.get("/", wrapAsync(listingController.index));

//New Route
router.get("/new", isLoggedIn, listingController.renderNewForm);


//Show Route
router.get("/:id", wrapAsync(listingController.showListing));

//Create Route
// router.post("/", isLoggedIn, validateListing, wrapAysnc(listingController.createListing));
router.post("/", isLoggedIn, upload.single("listing[image]"), validateListing, wrapAsync(listingController.createListing));

//Edit Route
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.renderEditform));

//Update Route
router.put("/:id", isLoggedIn, upload.single("listing[image]"), validateListing, wrapAsync(listingController.updateListing));

//Delete Route
router.delete("/:id", isLoggedIn, isOwner, wrapAsync(listingController.destroyListing));


module.exports = router;