import jwt from "jsonwebtoken";
import async_handler from "./async_handler.js";
import User from "../models/user_modal.js";

// protect routes
const protect = async_handler(async (req, res, next) => {
  let token;

  // read the jwt from cookie
  token = req.cookies.jwt;

  if (token) {
    try {
      const decoded_token = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded_token.user_id).select("-password");
      next();
    } catch (error) {
      console.log("💥 ERROR while verify token", error);
      res.status(401);
      throw new Error("Not Authorized. Token Failed.");
    }
  } else {
    res.status(401);
    throw new Error("Not Authorized.");
  }
});

// admin middleware
const admin = (req, res, next) => {
  console.log(req.user);
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error("Not Authorized as Admin.");
  }
};

export { protect, admin };
