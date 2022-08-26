const express = require('express');

const router = express.Router();
const { handleUser } = require('../../controller/loginController')

router.route('/')
    .post(handleUser)

module.exports = router