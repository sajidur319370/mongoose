const { mongoose } = require("mongoose");
const { isURL } = require("validator");
const { ObjectId } = mongoose.Schema.Types;
// Schema Design
const categorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a category name"],
      lowercase: true,
      unique: true,
    },
    description: String,
    imageUrl: {
      type: String,
      validate: [isURL, "Please provide a valid url"],
    },
  },
  {
    timestamps: true,
  }
);

// Model
const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
