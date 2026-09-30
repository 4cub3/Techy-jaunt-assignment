import mongoose, { Schema } from "mongoose";
import type { IUser } from "../types/user.types";

type IExtendUser = IUser & {
  isEmailVerified: boolean;
  tokenHashed: string;
};

const userSchema: Schema<IExtendUser> = new Schema<IExtendUser>(
  {
    email: {
      type: String,
      trim: true,
      unique: true,
      required: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    tokenHashed: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: {
      transform: (_, ret: Record<string, unknown>) => {
        const newUSer = {
          id: ret["_id"],
          email: ret["email"],
          firstName: ret["firstName"],
          lastName: ret["lastName"],
        };
        return newUSer;
      },
    },
  },
);

export default mongoose.model<IExtendUser>("User", userSchema);
