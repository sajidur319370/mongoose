const mongoose = require("mongoose");
const validator = require("validator");
const { default: isEmail } = require("validator/lib/isEmail");
const { default: isMobilePhone } = require("validator/lib/isMobilePhone");
const { default: isStrongPassword } = require("validator/lib/isStrongPassword");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const { default: isURL } = require("validator/lib/isURL");

const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      validate: [isEmail, "Please provide a valid email"],
      trim: true,
      lowercase: true,
      unique: true,
      required: [true, "Email must be required"],
    },
    password: {
      type: String,
      required: [true, "Password must be required"],
      validate: [isStrongPassword, "Password is not enough strong."],
      /* {
        validator: function (value) {
          isStrongPassword(value, {
            minLength: 6,
            minLowercase: 1,
            minUppercase: 1,
            minSymbols: 1,
            minNumbers: 1,
          });
        },
        message: "Password is not enough strong.",
      }, */
    },
    confirmPassword: {
      type: String,
      required: [true, "Please confirm your password"],
      validate: {
        validator: function (value) {
          return value === this.password;
        },
        message: "Password doesnt match.",
      },
    },
    role: {
      type: String,
      enum: {
        values: ["buyer", "manager", "admin"],
      },
      default: "buyer",
    },
    firstName: {
      type: String,
      required: [true, "Provide a name"],
      trim: true,
      lowercase: true,
      minLength: [3, "Name must be atleast 3 character"],
      maxLength: [100, "Name is too large ."],
    },
    lastName: {
      type: String,
      required: [true, "Provide a name"],
      trim: true,
      lowercase: true,
      minLength: [3, "Name must be atleast 3 character"],
      maxLength: [100, "Name is too large ."],
    },
    ContactNumber: {
      type: String,
      required: [true, "Please provide contact Number."],
      validate: [isMobilePhone, "Please provide a valid phone number"],
    },
    shippingAddress: String,
    imageUrl: {
      type: String,
      required: true,
      validate: [isURL, "please provide a valid url."],
    },
    status: {
      type: String,
      enum: {
        values: ["active", "inactive", "blocked"],
      },
      default: "inactive",
    },
    confirmationToken: String,
    confirmationTokenExpired: Date,
    passwordCreatedAt: Date,
    passwordResetToken: String,
    passwordResetExpire: Date,
  },
  { timestamps: true }
);

userSchema.pre("save", function (next) {
  const password = this.password;
  const hashedPassword = bcrypt.hashSync(password);
  this.password = hashedPassword;
  this.confirmPassword = undefined;
  next();
});

userSchema.methods.comparePassword = function (password, hash) {
  const isPasswordValid = bcrypt.compareSync(password, hash);
  return isPasswordValid;
};

userSchema.methods.generateConfirmationToken = function () {
  const token = crypto.randomBytes(32).toString("hex");
  this.confirmationToken = token;

  const date = new Date();
  date.setDate(date.getDate() + 1);

  this.confirmationTokenExpired = date;
  return token;
};

const User = mongoose.model("User", userSchema);
module.exports = User;
