const mongoose = require("mongoose")

const Order = require("../models/order")
const Product = require("../models/product")

exports.get1 = async (req, res, next) => {
    Order.find()
    .select('product quantity _id')
    .exec()
    .then(docs => {
        res.status(200).json({
            message: "All orders fetched successfully",
            count: docs.length,
            orders: docs.map(doc => {
                return {
                    _id: doc._id,
                    product: docs.product,
                    quantity: docs.quantity,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:9000/api/order' + docs.id
                    }
                }
            })
        })
    })
    .catch(err => {
        res.status(400).json({
            message: "Error while fetching orders",
            error: err
        })
    })
}

exports.post = async (req, res) => {
    Product.findById(req.body.findById)
    .then(product => {
        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            })
        }
        const order = new Order({
            _id: mongoose.Types.ObjectId(),
            quantity: req.body.quantity,
            product: req.body.productId
        })
        return order.save()
        .then(result => {
            console.log(result);
            res.status(201).json({
              message: "Order stored",
              createdOrder: {
                _id: result._id,
                product: result.product,
                quantity: result.quantity
              },
              request: {
                type: "GET",
                url: "http://localhost:3000/orders/" + result._id
              }
            });
          })
    }).catch(err => {
        res.status(400).json({
            message: "product mot found",
            error: err
        })
    })
    // // const order = {
    // //     processId: req.body.processId,
    // //     quantity: req.body.quantity 
    // // }
    // const order = new Order({
    //     _id: mongoose.Types.ObjectId(),
    //     product: req.body.productId,
    //     quantity: req.body.quantity
    // })
    // order.save()
    // .then(result => {
    //     res.status(200).json({
    //         message: "Order created successfully",
    //         result: result,
    //         createOrder: {
    //             _id: result._id,
    //             product: result.product,
    //             quantity: result.quantity
    //         },
    //         request: {
    //             type: 'GET',
    //             url: 'http://localhost:9000/api/order' + result._id
    //         }
    //     })
    // })
    // .catch(err => {
    //     res.status(400).json({
    //         message: "Error while creating order",
    //         error: err
    //     })
    // })
}

exports.get = async (req, res) => {
    Order.findById(req.params.orderId)
    .exec()
    .then(order => {
      if (!order) {
        return res.status(404).json({
          message: "Order not found"
        });
      }
      res.status(200).json({
        order: order,
        request: {
          type: "GET",
          url: "http://localhost:3000/orders"
        }
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
    // const id = req.params.productId;
    // if (id === 'special') {
    //     res.status(200).json({
    //         message: "Handling get request",
    //         id: id
    //     })
    // } else {
    //     res.status(200).json({
    //         message: 'you passed an in'
    //     })
    // }
}

exports.patch = async (req, res) => {
    res.status(200).jon({
        message: "Updated product"
    })
}

exports.delete = async (req, res) => {
    Order.remove({ _id: req.params.orderId })
    .exec()
    .then(result => {
        res.status(200).json({
            message: "Order deleted",
            request: {
                type: 'POST',
                url: "http://localhost:9000/api/order",
                body:  { productId : 'ID', quantity: 'Number'}
            }
        })
    })

    res.status(200).json({
        message: "deleted product"
    })
}


// router.post("/", (req, res, next) => {
//     Product.findById(req.body.productId)
//       .then(product => {
//         if (!product) {
//           return res.status(404).json({
//             message: "Product not found"
//           });
//         }
//         const order = new Order({
//           _id: mongoose.Types.ObjectId(),
//           quantity: req.body.quantity,
//           product: req.body.productId
//         });
//         return order.save();
//       })
//       .then(result => {
//         console.log(result);
//         res.status(201).json({
//           message: "Order stored",
//           createdOrder: {
//             _id: result._id,
//             product: result.product,
//             quantity: result.quantity
//           },
//           request: {
//             type: "GET",
//             url: "http://localhost:3000/orders/" + result._id
//           }
//         });
//       })
//       .catch(err => {
//         console.log(err);
//         res.status(500).json({
//           error: err
//         });
//       });
//   });