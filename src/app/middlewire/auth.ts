import jwt, { JwtPayload } from 'jsonwebtoken';
import { TUserRole } from '../modules/user/user.interface';
import { catchAsync } from '../utils/catchAsync';
import config from '../config';
import { User } from '../modules/user/user.model';

const auth = (...roles: TUserRole[]) => {
  return catchAsync(async (req, _res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    // checking if the token is missing
    if (!token) {
      throw new Error('You are not authorized!');
    }

    // checking if the given token is valid
    const decoded = jwt.verify(token, config.jwt) as JwtPayload;

    const { email, role } = decoded;

    await User.validateUser(email);

    if (roles && !roles.includes(role as TUserRole)) {
      throw new Error('you are not authorized');
    }

    req.user = decoded;
    next();
  });
};

export default auth;
