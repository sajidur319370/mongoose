const { default: mongoose } = require("mongoose");
const { default: isURL } = require("validator/lib/isURL");
const { ObjectId } = mongoose.Schema.Types;

// Schema Design
const stockSchema = mongoose.Schema(
  {
    productId: {
      type: ObjectId,
      required: true,
      ref: "Product",
    },
    name: {
      type: String,
      required: [true, "Please Provide a name for this stock"],
      trim: true,
      // unique: [true, "Name must be unique"],
      minLength: [3, "Name must be at least 3 character"],
      maxLength: [100, "Name is too large"],
      lowercase: true,
    },
    description: {
      type: String,
      required: true,
    },

    imageUrls: [
      {
        type: String,
        required: true,
        validate: [isURL, "Please provide a valid URL"],
      },
    ],
    unit: {
      type: String,
      required: true,
      enum: {
        values: ["kg", "litre", "pcs", "bag"],
        message: "Unit value cannot be {VALUE},Must be kg/litre/pcs/bag",
      },
    },

    price: {
      type: Number,
      required: true,
      min: [0, "Price cannot be negative"],
    },
    quantity: {
      type: Number,
      required: true,
      min: [0, "Quantity cannot be negative"],
    },
    category: {
      type: String,
      required: true,
    },
    brand: {
      name: {
        type: String,
        required: true,
      },
      id: {
        type: ObjectId,
        ref: "Brand",
        required: true,
      },
    },
    status: {
      type: String,
      required: true,
      enum: {
        values: ["in-stock", "out-of-stock", "discontinued"],
      },
      message: "status cannot be {VALUE",
    },

    store: {
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
      id: {
        type: ObjectId,
        required: true,
        ref: "Store",
      },
    },

    suppliedBy: {
      name: {
        type: String,
        trim: true,
        required: [true, "Please provide a supplier name"],
      },
      id: {
        type: ObjectId,
        ref: "Supplier",
      },
    },
    sellCount: {
      type: Number,
      default: 0,
      min: 0,
    },
  },

  { timestamps: true }
);

// Model
const Stock = mongoose.model("Stock", stockSchema);

module.exports = Stock;
