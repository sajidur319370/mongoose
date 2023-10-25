const { default: mongoose } = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
// Schema Design
const storeSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Please provide a store name"],
      // lowercase: true,
      enum: {
        values: [
          "Dhaka",
          "Rajsahi",
          "Chittagong",
          "Comilla",
          "Rangpur",
          "Khulna",
          "Jessore",
          "Noakhali",
        ],
        message: "{VALUE} is not a valid name",
      },
    },
    description: {
      type: String,
    },

    manager: {
      name: String,
      contact: String,
      id: {
        type: ObjectId,
        ref: "User",
      },
    },
  },
  { timestamps: true }
);

// Model
const Store = mongoose.model("Store", storeSchema);
module.exports = Store;
