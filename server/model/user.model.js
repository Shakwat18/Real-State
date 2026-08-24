import mongoose from "mongoose";


const userModel = new mongoose.Schema(
  {
    name: {
      type: String,
      requried: true,
    },
    email: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    bookedVisits: {
      _id: mongoose.Schema.Types.ObjectId,
      date: Date
    },
    favResidenciesID: {
      type: mongoose.Schema.Types.ObjectId,
    },
    ownerResidencies: {
      type: Array,
    },
  },
  { timeStamp: true },
);

const User = mongoose.model("users", userModel);
 export default  User
