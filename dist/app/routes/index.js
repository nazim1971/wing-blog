"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const blog_routes_1 = require("../modules/blog/blog.routes");
const router = (0, express_1.Router)();
const moduleRoutes = [
    { path: '/blogs', route: blog_routes_1.BlogRoutes },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
