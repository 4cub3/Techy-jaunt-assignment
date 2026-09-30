import { Router } from "express";
import { PROFILE_ROUTE } from "../types/routes.types";
import User from "../controllers/user.controllers";
import isAuth from "../middleware/is-auth.validate";
const router = Router();
router.get(PROFILE_ROUTE.PROFILE, isAuth, User.getUser);

export default router;
