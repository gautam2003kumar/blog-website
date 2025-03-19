import mongoose, { Schema, Document, Model } from "mongoose";

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  verifyCode: string;
  isVerified: boolean;
  verifyCodeExpiry: Date;
  isAdmin: boolean;
}

// Use Schema<IUser> directly without adding the <User> type.
const UserSchema: Schema<IUser> = new Schema<IUser>({
  username: {
    type: String,
    required: [true, "Username is required"],
    trim: true,
    unique: true,
  },

  email: {
    type: String,
    required: [true, "Email is required"],
    trim: true,
    unique: true,
    match: [
      /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
      "Please enter a valid email address",
    ],
  },

  password: {
    type: String,
    required: [true, "Password is required"],
  },

  verifyCode: {
    type: String,
    required: [true, "Verify code is required"],
  },

  verifyCodeExpiry: {
    type: Date,
    required: [true, "Verify code expiry is required"],
  },

  isVerified: {
    type: Boolean,
    default: false,
  },

  isAdmin: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true }); 


const UserModel: Model<IUser> = mongoose.models.User as Model<IUser> || mongoose.model<IUser>("User", UserSchema);

export default UserModel;
