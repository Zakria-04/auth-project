import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import AUTH_MODEL from "../Models/auth.model";
import { serverError } from "../../utils/serverError";
import { generateAccessToken, generateRefreshToken } from "../../utils/jwt";

const createNewUser = async (req: Request, res: Response) => {
  try {
    const { username, email, confirmEmail, password, confirmPassword } =
      req.body;

    // check if all fields are provided
    if (!username || !email || !confirmEmail || !password || !confirmPassword) {
      return res.status(400).json({
        message: "All fields are required.",
      });
    }

    // check if email and confirmEmail match
    if (email !== confirmEmail) {
      return res.status(400).json({
        message: "Email and confirm email must match.",
      });
    }

    // check if password and confirmPassword match
    if (password !== confirmPassword) {
      return res.status(400).json({
        message: "Password and confirm password must match.",
      });
    }

    // check if email already exists
    const existingUser = await AUTH_MODEL.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists with this email.",
      });
    }

    // create tokens
    const payload = { username, email };

    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    // create new user
    const hashedPassword = await bcrypt.hash(password, 12); // Hash the password
    await AUTH_MODEL.create({
      username,
      email,
      password: hashedPassword,
      refreshToken,
    });

    return res.status(201).json({
      message: "User created successfully.",
      accessToken,
      user: {
        username,
        email,
      },
    });
  } catch (error) {
    serverError(res, error);
  }
};

export { createNewUser };
