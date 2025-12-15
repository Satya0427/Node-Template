const express = require("express");
const { userCreationApiHandler, userListAPIHandler } = require("./user.controller");
const { accessTokenValidatorMiddleware } = require("../../common/middleware/error.middleware.ts")


const user_router = express.Router();

user_router.post('/creation', accessTokenValidatorMiddleware, userCreationApiHandler);
user_router.get('/users-list', accessTokenValidatorMiddleware, userListAPIHandler)

module.exports = { user_router }