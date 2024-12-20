import config from "../../config";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { AuthService } from "./auth.service";

const registerUser = catchAsync(async (req, res) => {
	const result = await AuthService.registerUserIntoDB(req.body);
    const {_id, name, email} = result

	sendResponse(res, {
        success: true,
        message: 'User is login successfully',
        statusCode: httpStatus.CREATED,
        data: {
         _id,
         name,
         email
        },
      });
});

const loginUser = catchAsync(async (req, res) => {
	const tokens = await AuthService.loginUser(req.body);

	const { refreshToken, accessToken } = tokens;

	res.cookie('refreshToken', refreshToken, {
		secure: config.nodeEnv === 'production',
		httpOnly: true,
	});
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User is login successfully',
        data: {
          token: accessToken,
        },
      });
	
});

export const AuthController = {
    registerUser, loginUser
}