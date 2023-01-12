const jwt = require("jsonwebtoken")

function checkauth(req, res, next){
    try {
        const token = req.headers.authorization.split(" ")[1]  
        const decoded = jwt.verify(token, process.env.secret)  /* req.body.token */
        req.userData = decoded
        next()
    } catch(err) {
        return res.status(401).json({
            message: "Auth failed in middleware"
        })
    }
    next();
}

module.exports = {
    checkauth: checkauth
}