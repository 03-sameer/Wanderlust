// const mongoose = require("mongoose");
// const initData = require("./data.js");
// const Listing = require("../Models/listing.js");


// // const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust0";
// const dbUrl = process.env.ATLASDB_URL;

// main()
//     .then(() => {
//         console.log("connected to db");
//     })
//     .catch((err) => {
//         console.log(err);
//     });

// async function main(){
//     await mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
// };    

// const initDB = async() =>{
//    await Listing.deleteMany({});
// //    there is err in this line i commented this coz  i think this is maps code dono
// //    initData.data = initData.data.map((obj) => ({...obj, owner:}))

//    await Listing.insertMany(initData.data);
//    console.log("data was initialized");
// };

// initDB();




const mongoose = require("mongoose");
const initializeData = require("./data.js");
const Listing = require("../Models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust0";

main().then(()=>{
    console.log("connected to DB");
}).catch((err)=>{
    console.log(err);
});

async function main(){
    await mongoose.connect(MONGO_URL);
}

const initDB = async() => {
    await Listing.deleteMany({});
    initializeData.data = initializeData.data.map((obj) => ({...obj, owner: "6693768a0281d9e737a494ce"}));
    await Listing.insertMany(initializeData.data);
    console.log("data was initialized");
}

initDB();