/**
 * User.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */
var bcrypt = require('bcryptjs');

module.exports = {

    tableName: "users",

    attributes: {

        //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
        //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
        //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝

        firstname: {
            type: 'string',
            required: true
        },

        lastname: {
            type: 'string',
            required: true,
        },

        email: {
            type: 'string',
            unique: true,
            required: true,
            isEmail: true
        },

        password: {
            type: 'string',
            required: true,
        },

        phone: {
            type: 'string',
            required: true,
            unique: true
        },

        address: {
            type: 'string'
        },



        //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
        //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
        //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


        //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
        //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
        //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝

    },
    toJSON: function() {
        var obj = this.toObject();
        delete obj.password;
        return obj;
    },
    beforeCreate: function(user, cb) {
        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(user.password, salt, function(err, hash) {
                if (err) {
                    console.log(err);
                    cb(err);
                } else {
                    user.password = hash;
                    cb();
                }
            });
        });

    },
    comparePassword: function(password, user, cb) {
        bcrypt.compare(password, user.password, function(err, match) {

            if (err) cb(err);
            if (match) {
                cb(null, true);
            } else {
                cb(err);
            }
        })
    }

};