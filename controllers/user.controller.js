const {
  signupService,
  findUserByEmail,
  findUserByToken,
} = require("../services/user.service");
const { generateToken } = require("../utils/token");
const { sendMailWithGmail } = require("../utils/mail");
// ==============================SignUp=================================
exports.signup = async (req, res, next) => {
  try {
    const user = await signupService(req.body);
    const token = user.generateConfirmationToken();
    await user.save({ validateBeforeSave: false });
    const mailData = {
      to: [user.email],
      subject: "Verify your account",
      text: `Thank You for creating your account.please verify here:${
        req.protocol
      }://${req.get("host")}${req.originalUrl}/confirmation/${token}`,
    };
    sendMailWithGmail(mailData);
    res.status(200).json({
      status: "success",
      message: "Successfully Signed Up.",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "failed",
      error: error,
    });
  }
};
// ==============================Login=================================
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(401).json({
        status: "Failed",
        error: "Please send your Credentials",
      });
    }

    const user = await findUserByEmail(email);

    if (!user) {
      return res.status(402).json({
        status: "Failed",
        error: "Please create your account first.",
      });
    }

    const isPasswordValid = user.comparePassword(password, user.password);

    if (!isPasswordValid) {
      return res.status(403).json({
        status: "Failed",
        error: "Password is not correct.",
      });
    }

    if (user.status != "active") {
      return res.status(401).json({
        status: "Failed",
        error: "Please activate your account",
      });
    }

    const token = generateToken(user);
    const { password: pass, ...others } = user.toObject();
    res.status(200).json({
      status: "success",
      message: "Successfully Logged in.",
      data: {
        user: others,
        token,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "failed",
      error: error,
    });
  }
};
// ==============================get me=================================

exports.getMe = async (req, res) => {
  try {
    const user = await findUserByEmail(req.user?.email);
    res.status(200).json({
      status: "Success",
      data: user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "failed",
      error: error,
    });
  }
};
exports.confirmEmail = async (req, res) => {
  try {
    const { token } = req.params;
    const user = await findUserByToken(token);
    const expird = new Date() > new Date(user?.confirmationTokenExpired);

    if (!user) {
      return res.status(403).json({
        status: "failed",
        error: "Invalid Token!!",
      });
    }
    if (expird) {
      return res.status(401).json({
        status: "failed",
        error: "Token expired!!",
      });
    }

    user.status = "active";
    user.confirmationToken = undefined;
    user.confirmationTokenExpired = undefined;

    user.save({ validateBeforeSave: false });

    res.status(200).json({
      status: "Success",
      data: "Successfully activated your account",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "failed",
      error: error,
    });
  }
};
