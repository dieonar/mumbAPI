/* ----------------------------------------- */
/* ---------------- REQUIRE ---------------- */
/* ----------------------------------------- */

var async       = require("async");
var config      = require('../config').config;
var utils       = require('../utils');

var getServers = function(options, callback) {

    var result = {
        error: null
    }

    callback(result);
}

exports.getServers = getServers;