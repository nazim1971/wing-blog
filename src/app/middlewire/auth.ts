import config from "../config";
import { AppError } from "../error/AppError";
import { TUserRole } from "../modules/user/user.interface";
import { catchAsync } from "../utils/catchAsync";
import jwt, { JwtPayload } from 'jsonwebtoken'

export const auth = (...requiredRoles: TUserRole[]) => {
    return catchAsync(async (req, res, next) => {
        const token = req.headers.authorization;
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are no authorized');
    }

    const decoded = jwt.verify(token, config.jwt) as JwtPayload;

    const {role, email}  = decoded
    
    })
}