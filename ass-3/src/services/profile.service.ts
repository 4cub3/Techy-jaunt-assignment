import User from "../models/user.model";

export const getProfile = async (id: string) => {
  try {
    const user = await User.findById(id);
    return user;
  } catch (error) {
    throw error;
  }
};
