import config from "../../config";
import { AppError } from "../../error/AppError";
import { TUser } from "../user/user.interface";
import { User } from "../user/user.model";
import { TLogin } from "./auth.interface";
import jwt from 'jsonwebtoken';

const registerUserIntoDB = async (payload: TUser) => {
	const result = await User.create(payload);

	// const { _id, name, email } = result.toObject();

	// const user = { _id, name, email };

	return result;
};

const loginUser = async(payload: TLogin)=>{

    // checking if the user is exist
    const user = await User.validateUser(payload.email);

      // Check if the password matches
  const isPasswordMatch = await User.isPasswordMatched(
    payload?.password,
    user?.password,
  );
  if (!isPasswordMatch) {
    throw new AppError(httpStatus.FORBIDDEN, 'Incorrect password');
  }

    //create token and send to the client
    const jwtPayload = {
        email: user.email,
        role: user.role,
      };

      const accessToken = jwt.sign(jwtPayload, config.jwt, { expiresIn: '10d' });
      const refreshToken = jwt.sign(jwtPayload, config.jwtRef, { expiresIn: '365d' });

      return {
        accessToken,
        refreshToken
      }
}

export const AuthService = { registerUserIntoDB, loginUser };