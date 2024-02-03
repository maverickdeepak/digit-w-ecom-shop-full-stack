import jwt from "jsonwebtoken";

const generate_token = (res, user_id) => {
  const token = jwt.sign({ user_id: user_id }, process.env.JWT_SECRET, {
    expiresIn: "30d", // 30 days
  });

  // set JWT token to HTTP only cookies
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  });
};

export default generate_token;
