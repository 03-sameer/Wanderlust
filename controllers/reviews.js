
const Listing  = require("../Models/listing.js");
const Review = require("../Models/review.js");

const mongoose = require('mongoose');


module.exports.createReview = async(req, res) => {
    let {id} = req.params;
    let listing = await Listing.findById(id);
    let newReview = new Review(req.body.review);

    newReview.author = req.user._id;
    listing.reviews.push(newReview);

    await newReview.save();
    await listing.save();

    req.flash("success", "New Review created");
    res.redirect(`/listings/${id}`);
};


// altered 
module.exports.deleteReview = async (req, res) => {
    const { id, reviewId } = req.params;

    try {
        // Convert the IDs to ObjectId instances
        const reviewObjectId = new mongoose.Types.ObjectId(reviewId.trim());
        const listingObjectId = new mongoose.Types.ObjectId(id.trim());

        await Listing.findByIdAndUpdate(listingObjectId, { $pull: { reviews: reviewObjectId } });
        await Review.findByIdAndDelete(reviewObjectId);

        req.flash("success", "Review deleted");
        res.redirect(`/listings/${listingObjectId}`);
    } catch (error) {
        req.flash("error", "Invalid ID format");
        res.redirect("/listings");
    }
};
