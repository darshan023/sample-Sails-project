/**
 * OrdersController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {


    create: function(req, res) {

        Orders.create(req.body)
            .then(() => {

                return res.ok("Order created successfully");
            })
            .catch((err) => {
                console.log(err);
                res.serverError(err.message)
            });
    },

    show: function(req, res) {

        console.log('params ', req.query)
        Orders.find({
            where: { user: req.query.uid },
            limit: req.query.size

        }, function(err, orders) {
            console.log(orders)
            return res.json({
                orders: orders
            });

        })
    },


};