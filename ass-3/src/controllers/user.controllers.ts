import type { NextFunction, Request, Response } from "express";
import { getProfile } from "../services/profile.service";

class User {
  static async getUser(
    req: Request<{}, {}, {}, {}>,
    res: Response,
    next: NextFunction,
  ) {
    //@ts-ignore
    const userId = req.user.id;
    try {
      const userProfile = await getProfile(userId);
      res.send({
        id: userProfile?.id,
        email: userProfile?.email,
        fullName: `${userProfile?.firstName} ${userProfile?.lastName}`,
      });
    } catch (error) {
      next(error);
    }
  }
}
export default User;
