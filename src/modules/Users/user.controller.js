const { apiDataResponse, apiResponse } = require("../../common/utils/api_response");
const { async_error_handler } = require("../../common/utils/async_error_handler");
const { MESSAGES } = require("../../common/utils/messages");
const { USERS_SCHEMA } = require("../Users/user.schema");
const { encryptPassword } = require("../../common/utils/common")



const userCreationApiHandler = async_error_handler(async (req, res, _) => {
    let { name, email, password, phone_number, address } = req.body;

    // Required checking
    if (!name) return res.status(400).json(apiResponse(400, MESSAGES.NAME.REQUIRED));
    if (!email) return res.status(400).json(apiResponse(400, MESSAGES.EMAIL.REQUIRED));
    if (!password) return res.status(400).json(apiResponse(400, MESSAGES.PASSWORD.REQUIRED));
    if (!phone_number) return res.status(400).json(apiResponse(400, MESSAGES.PHONE_NUMBER.REQUIRED));

    // Type Checking
    if (typeof name != 'string') return res.status(400).json(apiResponse(400, MESSAGES.NAME.TYPE));
    if (typeof email != 'string') return res.status(400).json(apiResponse(400, MESSAGES.EMAIL.TYPE));
    if (typeof password != 'string') return res.status(400).json(apiResponse(400, MESSAGES.PASSWORD.TYPE));
    if (typeof phone_number != 'string') return res.status(400).json(apiResponse(400, MESSAGES.PHONE_NUMBER.TYPE));

    // Password converting into hashing or encreapting

    // Trimm all the key values
    name = name.trim();
    email = email.trim();
    password = password.trim();
    phone_number = phone_number.trim();
    address = address.trim();
    const hashedPassword = await encryptPassword(password);
    const payload = {
        name,
        email,
        password: hashedPassword,
        phone_number,
        address,
        user_type: 'user'
    }
    const data = await USERS_SCHEMA.create(payload);
    res.status(200).json(apiResponse(200, `User inserted ${MESSAGES.SUCCESS}`));
})

// GET USERS LIST API
const userListAPIHandler = async_error_handler(async (req, res) => {
    const data = await USERS_SCHEMA.find();
    res.status(200).json(apiDataResponse(200, `${MESSAGES.SUCCESS}`, data));
})


module.exports = { userCreationApiHandler, userListAPIHandler }