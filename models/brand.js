const { mongoose } = require("mongoose");
const { isEmail, isURL } = require("validator");

const { ObjectId } = mongoose.Schema.Types;

// Schema Design
const brandSchema = mongoose.Schema(
  {
    products: [
      {
        type: ObjectId,
        ref: "Product",
      },
    ],
    name: {
      type: String,
      trim: true,
      required: [true, "Please provide a brand name"],
      unique: true,
      maxLength: 100,
      lowercase: true,
    },
    description: {
      type: String,
    },
    email: {
      type: String,
      lowercase: true,
      validate: [isEmail, "Pleasess provide a valid Email"],
    },
    website: {
      type: String,
      validate: [isURL, "Please provide a valid url"],
    },
    location: String,
    suppliers: [
      {
        name: String,
        contractNumber: String,
        id: {
          type: ObjectId,
          ref: "Supplier",
        },
      },
    ],
    status: {
      type: String,
      enum: {
        values: ["active", "inactive"],
      },
      default: "active",
    },
  },
  { timestamps: true }
);

// Model
const Brand = mongoose.model("Brand", brandSchema);
module.exports = Brand;
