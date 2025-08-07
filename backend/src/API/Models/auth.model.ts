import { model, Schema } from "mongoose";

interface Auth {
  username: string;
  email: string;
  password?: string;
  authProvider: "google" | "email";
  refreshToken: string;
}

const authSchema = new Schema<Auth>(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      minlength: [3, "Username must be at least 3 characters long"],
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      match: [/.+@.+\..+/, "Please enter a valid email address"],
    },
    password: {
      type: String,
      required: function () {
        return this.authProvider === "email";
      },
      minlength: [6, "Password must be at least 6 characters long"],
    },
    authProvider: {
      type: String,
      enum: ["google", "email"],
      default: "email",
    },
    refreshToken: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const AUTH_MODEL = model<Auth>("user", authSchema);

export default AUTH_MODEL;
