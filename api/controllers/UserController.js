/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {


    create: function(req, res) {
        console.log(req.body);
        User.create(req.body)
            .then(() => {

                return res.ok("User created successfully");
            })
            .catch((err) => {
                console.log(err);
                return res.json(409, {
                    err: err.message
                });
                // res.serverError(err.message)
            });
    },

    authenticate: function(req, res) {
        console.log(req.body);
        User.findOne({
            email: req.body.email
        }, function(err, user) {
            if (!user) {
                return res.json(401, {
                    err: 'invalid email or password'
                });
            }
            console.log('User ', user)

            User.comparePassword(req.body.password, user, function(err, valid) {
                if (err) {
                    console.log("err ", err)
                    return res.json(403, {
                        err: 'forbidden'
                    });
                } else if (!valid) {
                    console.log('Invalid ', valid)
                    return res.json(401, {
                        err: 'invalid email or password'
                    });
                } else {
                    delete user.password;
                    res.json({
                        user: user,
                        token: jwToken.issue({
                            id: user.email
                        })
                    });
                }
            });
        })
    },




};