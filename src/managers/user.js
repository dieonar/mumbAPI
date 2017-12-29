/* ----------------------------------------- */
/* ---------------- REQUIRE ---------------- */
/* ----------------------------------------- */

var async       = require("async");
var config      = require('../config').config;
var utils       = require('../utils');
var Ice         = require('ice').Ice;
var IceManager  = require('../utils/IceManager').IceManager;

var getUsers = function(options, callback) {

    var result = {
        error: null
    }

    var ice = new IceManager();
    ice.getMeta().then(
        (meta) => {
            return meta.getServer(options.params.server).then(
                (server) => {
                    if (!server) {
                        result.error = "Invalid server id";
                        throw result;
                    }
                    return server;
                }
            );
        }
    ).then(
        (server) => {
            return server.getUsers().then(
                (users) => {
                    result.users = Array.from(users.values());
                    return result.users;
                }
            )
        }
    ).catch(
        (e) => {
            result.error = e.ice_name();
        }
    ).finally(
        () => {
            callback(result);
            ice.destoryCommunicator();
        }
    );
}

var getRegisteredUsers = function(options, callback) {

    var result = {
        error: null
    }

    var ice = new IceManager();
    ice.getMeta().then(
        (meta) => {
            return meta.getServer(options.params.server).then(
                (server) => {
                    if (!server) {
                        result.error = "Invalid server id";
                        throw result;
                    }
                    return server;
                }
            );
        }
    ).then(
        (server) => {
            return server.getRegisteredUsers(options.params.filter).then(
                (users) => {
                    result.users = Array.from(users.values());
                    return result.users;
                }
            )
        }
    ).catch(
        (e) => {
            result.error = e.ice_name();
        }
    ).finally(
        () => {
            callback(result);
            ice.destoryCommunicator();
        }
    );
}


exports.getUsers = getUsers;
exports.getRegisteredUsers = getRegisteredUsers;