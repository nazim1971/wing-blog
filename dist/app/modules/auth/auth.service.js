"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const config_1 = __importDefault(require("../../config"));
const AppError_1 = require("../../error/AppError");
const user_model_1 = require("../user/user.model");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const http_status_1 = __importDefault(require("http-status"));
const registerUserIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.isUserExists(payload === null || payload === void 0 ? void 0 : payload.email);
    if (user) {
        throw new AppError_1.AppError(http_status_1.default.CONFLICT, 'User Already Exist');
    }
    const data = yield user_model_1.User.create(payload);
    const { _id, name, email } = data;
    const result = { _id, name, email };
    return result;
});
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // checking if the user is exist
    const user = yield user_model_1.User.validateUser(payload.email);
    // Check if the password matches
    const isPasswordMatch = yield user_model_1.User.isPasswordMatched(payload === null || payload === void 0 ? void 0 : payload.password, user === null || user === void 0 ? void 0 : user.password);
    if (!isPasswordMatch) {
        throw new AppError_1.AppError(http_status_1.default.UNAUTHORIZED, 'Invalid credentials');
    }
    //create token and send to the client
    const jwtPayload = {
        email: user.email,
        role: user.role,
    };
    const accessToken = jsonwebtoken_1.default.sign(jwtPayload, config_1.default.jwt, { expiresIn: '30d' });
    const refreshToken = jsonwebtoken_1.default.sign(jwtPayload, config_1.default.jwtRef, {
        expiresIn: '365d',
    });
    return {
        accessToken,
        refreshToken,
    };
});
const refreshToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    // * Verify and decode token
    const decoded = jsonwebtoken_1.default.verify(token, config_1.default.jwtRef);
    // * Validate and extract user from DB.
    const user = yield user_model_1.User.validateUser(decoded.email);
    // * Create token and send to the  client.
    const jwtPayload = {
        email: user.email,
        role: user.role,
    };
    const accessToken = jsonwebtoken_1.default.sign(jwtPayload, config_1.default.jwt, { expiresIn: '30d' });
    return { token: accessToken };
});
exports.AuthService = { registerUserIntoDB, loginUser, refreshToken };
