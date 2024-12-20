"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./app/routes"));
const globalErrorHandler_1 = __importDefault(require("./app/middlewire/globalErrorHandler"));
const notFound_1 = __importDefault(require("./app/middlewire/notFound"));
class Application {
    constructor() {
        this.App = (0, express_1.default)();
        this.middleware();
        this.routes();
    }
    middleware() {
        this.App.use(express_1.default.json());
        this.App.use((0, cors_1.default)());
    }
    routes() {
        //Application Routes
        this.App.use('/api', routes_1.default);
        this.App.get('/', (req, res) => {
            res.status(200).json({
                success: true,
                message: 'Wink-blog on Fire 🔥🔥🔥',
            });
        });
        //Global error handel
        this.App.use(globalErrorHandler_1.default);
        //Not found
        this.App.use(notFound_1.default);
    }
}
exports.default = new Application();
