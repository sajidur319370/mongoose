const mongoose = require("mongoose");
const { default: isEmail } = require("validator/lib/isEmail");
const { default: isURL } = require("validator/lib/isURL");
const { default: isMobilePhone } = require("validator/lib/isMobilePhone");

const { ObjectId } = mongoose.Schema.Types;
const supplierSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Provide a name"],
      trim: true,
      lowercase: true,
      minLength: [3, "Name must be atleast 3 character"],
      maxLength: [100, "Name is too large ."],
    },
    email: {
      type: String,
      validate: [isEmail, "Please provide a valid Email."],
      trim: true,
      lowercase: true,
      unique: true,
    },
    brand: {
      name: {
        type: String,
        trim: true,
        required: true,
      },
      id: {
        type: ObjectId,
        required: true,
        ref: "Brand",
      },
    },

    contactNumber: [
      {
        type: String,
        required: [true, "Please provide a valid contact Number."],
        validate: [isMobilePhone, "Please provide a valid phone number"],
      },
    ],
    imergencyContactNumber: {
      type: String,
      required: [true, "Please provide a valid contact Number."],
      validate: [isMobilePhone, "Please provide a valid phone number"],
    },
    tradeLicenceNumber: {
      type: Number,
      required: [true, "Please provide a valid trade number."],
    },
    presentAddress: {
      type: String,
      required: [true, "Please provide present address."],
    },
    permanentAddress: {
      type: String,
      required: [true, "Please provide a Permanent address."],
    },
    location: {
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
    },
    imageUrl: {
      type: String,
      required: true,
      validate: [isURL, "please provide a valid url."],
    },

    nationalIdImageUrl: {
      type: String,
      required: true,
      validate: [isURL, "please provide a valid National id image url."],
    },
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
const Supplier = mongoose.model("Supplier", supplierSchema);
module.exports = Supplier;
