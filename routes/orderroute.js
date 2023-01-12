const express = require('express')
const router = express.Router()
const ordercontroller = require("../controller/order")
// const { createproductValidation, updateproductValidation } = require('../validation/productvalidation');
// const { validate } = require('../validation/validate');


router.get("/order/:orderId", ordercontroller.get)

router.post("/order",  ordercontroller.post)

router.get("/order", ordercontroller.get1)

router.delete("/order/:orderId", ordercontroller.delete)

router.patch("/order/:orderId",  ordercontroller.get)

module.exports = router


