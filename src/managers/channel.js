/* ----------------------------------------- */
/* ---------------- REQUIRE ---------------- */
/* ----------------------------------------- */

var async       = require("async");
var config      = require('../config').config;
var utils       = require('../utils');
var Ice         = require('ice').Ice;
var IceManager  = require('../utils/IceManager').IceManager;

var getChannels = function(options, callback) {

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
            return server.getChannels().then(
                (channels) => {
                    result.channels = Array.from(channels.values());
                    return result.channels;
                }
            )
        }
    ).catch(
        (e) => {
            try {
                result.error = e.ice_name();
            } catch (error) {
                result.error = e.message;
            }
        }
    ).finally(
        () => {
            callback(result);
            ice.destoryCommunicator();
        }
    );
}

exports.getChannels = getChannels;
