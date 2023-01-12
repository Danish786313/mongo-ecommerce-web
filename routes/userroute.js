const express = require("express")
const router = express.Router()
const usercontroller = require("../controller/user")

router.post("/signup", usercontroller.createuser)

router.post("/login", usercontroller.login)

module.exports = router