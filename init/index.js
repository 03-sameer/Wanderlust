const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../Models/listing.js");


// const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust0";
const dbUrl = process.env.ATLASDB_URL;

main()
    .then(() => {
        console.log("connected to db");
    })
    .catch((err) => {
        console.log(err);
    });

async function main(){
    await mongoose.connect(dbUrl);
};    

const initDB = async() =>{
   await Listing.deleteMany({});
//    there is err in this line i commented this coz  i think this is maps code dono
//    initData.data = initData.data.map((obj) => ({...obj, owner:}))

   await Listing.insertMany(initData.data);
   console.log("data was initialized");
};

initDB();
