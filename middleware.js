
const Listing = require("./Models/listing");
const Review = require("./Models/review");
const ExpressError = require("./utils/ExpressError.js");
const {listingSchema, reviewSchema} = require("./schema.js");
const mongoose = require('mongoose');

module.exports.isLoggedIn = (req, res, next) => {
  if(!req.isAuthenticated()){
      req.session.redirectUrl = req.originalUrl;
      req.flash("error", "You must be logged in");
      return res.redirect("/login");
  };
  next();
};

module.exports.saveRedirectUrl = (req, res, next) => {
  if(req.session.redirectUrl){
      res.locals.redirectUrl = req.session.redirectUrl;
  };
  next();
};

module.exports.isOwner = async(req, res, next) => {
  let {id} = req.params;
  let listing = await Listing.findById(id);
  if(!listing.owner.equals(res.locals.currUser._id)){
      req.flash("error", "You are not the owner of this listing");
      return res.redirect(`/listings/${id}`);
  };
  next();
};

module.exports.validateListing = (req, res, next) => {
  let {error} = listingSchema.validate(req.body);
  if(error){
      let errMsg = error.details.map((el) => el.message).join(",");
      throw new ExpressError(400, errMsg);
  }else{
      next();
  }
};

module.exports.validateReview = (req, res, next) => {
  let {error} = reviewSchema.validate(req.body);
  if(error){
      let errMsg = error.details.map((el) => el.message).join(",");
      throw new ExpressError(400, errMsg);
  }else{
      next();
  }
};

// altered
module.exports.isReviewAuthor = async (req, res, next) => {
    const { id, reviewId } = req.params;

    try {
        // Convert the IDs to ObjectId instances
        const reviewObjectId = new mongoose.Types.ObjectId(reviewId.trim());
        const listingObjectId = new mongoose.Types.ObjectId(id.trim());

        const review = await Review.findById(reviewObjectId);
        if (!review) {
            req.flash("error", "Review not found");
            return res.redirect(`/listings/${listingObjectId}`);
        }

        // Check if the current user is the author of the review
        if (!review.author.equals(res.locals.currUser._id)) {
            req.flash("error", "You are not the author of this review");
            return res.redirect(`/listings/${listingObjectId}`);
        }
        next();
    } catch (error) {
        req.flash("error", "Invalid ID format");
        return res.redirect("/listings");
    }
};
