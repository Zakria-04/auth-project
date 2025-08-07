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

const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // check if email and password are provided
    if (!email || !password) {
      res.status(400).json({
        message: "Email and password are required.",
      });
      return;
    }

    // find user by email
    const user = await AUTH_MODEL.findOne({ email });
    if (!user) {
      res.status(400).json({
        message: "User not found with this email.",
      });
      return;
    }

    // check if password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password!);
    if (!isPasswordValid) {
      res.status(400).json({
        message: "Invalid password.",
      });
      return;
    }

    // create tokens
    const payload = { username: user.username, email: user.email };
    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    // update user refresh token
    user.refreshToken = refreshToken;
    await user.save();

    return res.status(200).json({
      message: "Login successful.",
      accessToken,
      refreshToken,
      user: {
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    serverError(res, error);
  }
};

export { createNewUser, loginUser };
