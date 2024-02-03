import async_handler from "../middleware/async_handler.js";
import User from "../models/user_modal.js";
import jwt from "jsonwebtoken";

/**
 * @desc Auth User & get token
 * @route POST /api/users/auth
 * @access Public
 */

const auth_user = async_handler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email: email });
  const is_password_matched = await user.match_password(password);

  if (user && is_password_matched) {
    const token = jwt.sign({ user_id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d", // 30 days
    });

    // set JWT token to HTTP only cookies
    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });

    res.json({
      status: "success",
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      },
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password.");
  }

  // res.json({
  //   status: "success",
  //   length: users.length + 1,
  //   data: users,
  // });
});

/**
 * @desc Register a new User
 * @route POST /api/users
 * @access Public
 */

const register_user = async_handler(async (req, res) => {
  res.send("register user");
  // const users = await User.find({});
  // res.json({
  //   status: "success",
  //   length: users.length + 1,
  //   data: users,
  // });
});

/**
 * @desc Register a new User
 * @route POST /api/users
 * @access Public
 */

const login_user = async_handler(async (req, res) => {
  res.send("login user");
  // const users = await User.find({});
  // res.json({
  //   status: "success",
  //   length: users.length + 1,
  //   data: users,
  // });
});

/**
 * @desc Logout user / clear cookie
 * @route POST /api/users/logout
 * @access Public
 */

const logout_user = async_handler(async (req, res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0)
  });
  res.status(200).json({
    status: "success",
    message: 'Logged out successfully.'
  });
});

/**
 * @desc Get User Profile
 * @route GET /api/users/profile
 * @access Private
 */

const get_user_profile = async_handler(async (req, res) => {
  res.send("get user profile");
  // const users = await User.find({});
  // res.json({
  //   status: "success",
  //   length: users.length + 1,
  //   data: users,
  // });
});

/**
 * @desc Update User Profile
 * @route PUT /api/users/profile
 * @access Private
 */

const update_user_profile = async_handler(async (req, res) => {
  res.send("update user profile");
  // const users = await User.find({});
  // res.json({
  //   status: "success",
  //   length: users.length + 1,
  //   data: users,
  // });
});

/**
 * @desc Get Users
 * @route GET /api/users
 * @access Private/Admin
 */

const get_all_users = async_handler(async (req, res) => {
  res.send("get all users");
  // const users = await User.find({});
  // res.json({
  //   status: "success",
  //   length: users.length + 1,
  //   data: users,
  // });
});

/**
 * @desc Get User by ID
 * @route GET /api/users/:id
 * @access Private/Admin
 */

const get_user_by_id = async_handler(async (req, res) => {
  res.send("get user by id");
  // const users = await User.find({});
  // res.json({
  //   status: "success",
  //   length: users.length + 1,
  //   data: users,
  // });
});

/**
 * @desc Update User by ID
 * @route PUT /api/users/:id
 * @access Private/Admin
 */

const update_user = async_handler(async (req, res) => {
  res.send("update user by admin");
  // const users = await User.find({});
  // res.json({
  //   status: "success",
  //   length: users.length + 1,
  //   data: users,
  // });
});

/**
 * @desc Delete Users
 * @route DELETE /api/users:id
 * @access Private/Admin
 */

const delete_user = async_handler(async (req, res) => {
  res.send("delete user");
  // const users = await User.find({});
  // res.json({
  //   status: "success",
  //   length: users.length + 1,
  //   data: users,
  // });
});

export {
  auth_user,
  register_user,
  logout_user,
  get_user_profile,
  update_user_profile,
  get_all_users,
  delete_user,
  get_user_by_id,
  update_user,
};
