/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

    //user
    'POST /user/create': 'UserController.create',
    'POST /user/authenticate': 'UserController.authenticate',


    //orders

    'POST /order/create': 'OrdersController.create',
    'GET /order/getorders': 'OrdersController.show',

};