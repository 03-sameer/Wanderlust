const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");
const { type } = require("os");

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: {
    type: String,
    url: String,
    filename: String,
  },
  price: Number,
  location: String,
  country: String,
  reviews: [{
    type: Schema.Types.ObjectId,
    ref : "Review",
  },
  ],
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },


  //bit confused this code is saw in phase 3 part c while taking examples for icon functionality
  
  // geometry:{
  //   type: {
  //   type: String,
  //   enum: ["Point"],
  //   required: true,
  
  // coordinates:{
  //       type: [Number],
  //       required: true,
  //     },
  //   },


    //this thing below is for upgrading the icons

    // category: {
    //   type:String,
    //   enum: ["mountains", "arctic", "castle"],
    // }
});



// this schema is altered from chatGpt
// const listingSchema = new mongoose.Schema({
//   title: { type: String, required: true },
//   description: { type: String, required: true },
//   price: { type: Number, required: true },
//   location: { type: String, required: true },
//   country: { type: String, required: true },
//   image: {
//       filename: { type: String }, // Make filename optional
//       url: { type: String, required: true }
//   }
// });

listingSchema.post("findOneAndDelete", async (listing) =>{
  if(listing){
    await Review.deleteMany({_id : {$in: listing.reviews}});
  }
  
})

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;