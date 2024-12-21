import { Model } from "mongoose";
import { USER_ROLE } from "./user.constants";

export type TUserRole = (typeof USER_ROLE)[keyof typeof USER_ROLE];

export interface TUser {
    name: string;
    email: string;
    password: string;
    role: TUserRole
    isBlocked: boolean;
}



export interface UserModel extends Model<TUser> {
	validateUser(email?: string): Promise<TUser>;

    isPasswordMatched(
        plainTextPassword: string,
        hashedPassword: string,
      ): Promise<boolean>;
}