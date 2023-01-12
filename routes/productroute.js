const express = require('express')
const router = express.Router()
const productcontroller = require("../controller/productcontroller")
const fileupload = require("../middleware/fileupload")
// const { createproductValidation, updateproductValidation } = require('../validation/productvalidation');
// const { validate } = require('../validation/validate');
const check_auth = require("../middleware/check-Auth")


router.get("/product/:productId",  productcontroller.get)

router.post("/product", fileupload.upload.single('image'), productcontroller.post)

router.get("/product",  check_auth.checkauth, productcontroller.get1)

router.patch("/product/:productId",  productcontroller.patch)

router.delete("/product/:productId", productcontroller.delete)

module.exports = router


