import express from "express";
const routes = express.Router();
import { protect, admin } from "../middleware/auth_middleware.js";

import {
  auth_user,
  register_user,
  logout_user,
  get_user_profile,
  update_user_profile,
  get_all_users,
  delete_user,
  get_user_by_id,
  update_user,
} from "../controllers/user_controller.js";

routes.route("/").post(register_user).get(protect, admin, get_all_users);
routes.post("/logout", logout_user);
routes.post("/auth", auth_user);
routes
  .route("/profile")
  .get(protect, get_user_profile)
  .put(protect, update_user_profile);
routes
  .route("/:id")
  .delete(protect, admin, delete_user)
  .get(protect, admin, get_user_by_id)
  .put(protect, admin, update_user);

export default routes;
