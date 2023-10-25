const { default: mongoose } = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const { isURL } = require("validator");

// SCHEMA -> MODEL -> QUERY
// Schema Design
const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please Provide a name for this product"],
      trim: true,
      unique: [true, "Name must be unique"],
      minLength: [3, "Name must be at least 3 character"],
      maxLength: [100, "Name is too large"],
      lowercase: true,
    },
    description: {
      type: String,
      required: true,
    },

    unit: {
      type: String,
      required: true,
      enum: {
        values: ["kg", "litre", "pcs", "bag"],
        message: "Unit value cannot be {VALUE},Must be kg/litre/pcs/bag",
      },
    },
    imageURLs: [
      {
        type: String,
        required: true,
        validate: {
          validator: (value) => {
            if (!Array.isArray(value)) {
              return false;
            } else {
              let isValid = true;
              value.array.forEach((url) => {
                if (isURL(url)) {
                  isValid = false;
                }
                {
                  return isValid;
                }
              });
            }
          },
          message: "Please provide a valid URL",
        },
      },
    ],

    category: {
      type: String,
      required: true,
    },
    brand: {
      name: {
        type: String,
        required: [true, "Please provide a  brand name"],
        lowercase: true,
      },
      id: {
        type: ObjectId,
        ref: "Brand",
        required: true,
      },
    },
  },
  { timestamps: true }
);

// Mongoose middleware for saving data
/* productSchema.pre("save", function (next) {
  console.log("Before Saving Data");
  // This->
  if (this.quantity == 0) {
    this.status = "Out of Stock";
  }
  next();
}); */

// Model
const Product = mongoose.model("Product", productSchema);

module.exports = Product;
