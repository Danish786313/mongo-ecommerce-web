const mongoose = require("mongoose")
const User = require("../models/user")
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")

exports.createuser = async (req, res) => {
    User.find({ email: req.body.email }).exec().then(user => {
        if (user.length) {
            return res.status(409).json({
                message: "Mail exists"
            })
        } else {
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if (err) {
                    return res.status(500).json({
                        error: err
                    })
                } else {
                    const user = new User({
                        _id: new  mongoose.Types.ObjectId(),
                        email: req.body.email,
                        password: hash
                    })
                    user.save().then(result => {
                        res.status(200).json({
                            message: "User created"
                        })
                    }).catch(err => {
                        res.status(500).json({
                            error: err
                        })
                    })
                }
            })
        }
    }).catch(err => {
        res.status(400).json({
            success: false,
            message: "Something went wrong while creating user",
            error: err
        })
    })
}


exports.login = async (req, res) => {
    User.find({ email : req.body.email }).exec().then(user => {
        if (!user.length) {
            return res.status(401).json({
                success: false,
                message: "Mail not found Auth failed"
            })
        }
        bcrypt.compare(req.body.password, user[0].password, (err, result) => {
            console.log(err)
            if (err) {
                return res.status(401).json({
                    message: "Auth failed"
                })
            }
            if (result) {
                const token =  jwt.sign({
                    email: user[0].email,
                    userId: user[0]._id
                }, process.env.secret, { expiresIn : "1h" })
                return res.status(200).json({
                    message: "Auth successful",
                    token: token
                })
            }
            res.status(401).json({
                message: 'Auth failed 2'
            })
        })
    }).catch()
}

exports.userdelete = async (req, res) => {
    User.remove({ _id: req.params.userId }).exec().then(result => {
        res.status(200).json({
            message: "user deleted"
        })
    }).catch(err => {
        res.status.json({
            error: err
        })
    })
}