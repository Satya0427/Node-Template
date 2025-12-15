const express = require("express")
// Modules Importing
const auth_router = require("./Auth/auth.router")
const { user_router } = require("./Users/user.router")

const main_router = express.Router();



main_router.use('/auth', auth_router);
main_router.use('/user', user_router);

module.exports = main_router;