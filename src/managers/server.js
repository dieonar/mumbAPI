/* ----------------------------------------- */
/* ---------------- REQUIRE ---------------- */
/* ----------------------------------------- */

var async       = require("async");
var config      = require('../config').config;
var utils       = require('../utils');
var Ice         = require('ice').Ice;
var IceManager  = require('../utils/IceManager').IceManager;


var getServerStatus = function(options, callback) {
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
    ).catch(
        (e) => {
            result.error = e.ice_name();
        }
    ).finally(
        () => {
            callback(result);
            ice.destoryCommunicator();
        }
    )
}

var getServerConfig = function(options, callback) {

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
            return ice.getConfiguration().then(
                (config) => {
                    return config;
                }
            ).then(
                (defaultConf) => {
                    return server.getAllConf().then(
                        (config) => {

                           defaultConf.forEach(
                               (val, key, arr) => {
                                    if (!config.has(key))
                                        config.set(key, val);
                               }
                            );

                            if (config.get("port") == defaultConf.get("port"))
                                config.set("port", Number(config.get("port")) + (Number(options.params.server) - 1));
                            
                            result.config = {};
                            config.forEach( (v, k) => { result.config[k] = v;})
                            return result;
                        }
                    )                    
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
    )
}


var getServers = function(options, callback) {

    var result = {
        error: null,
        servers: []
    }
    
    var ice = new IceManager();
    ice.getMeta().then(
        (meta) => {
            meta.getAllServers().then(function (servers) {
                servers.forEach(srv => {



                    Ice.Promise.all(
                        srv.getUptime().then(
                            function(t) {
                                json.uptime = t.toString();
                        }),
                        server.getUsers().then(
                            function(u) {
                                json.userCount = u.values().length.toString();
                        }),
                    server.getRegisteredUsers('').then(
                        function(r) {
                        json.registeredUserCount = r.values().length.toString();
                    })
                    );


                    srv.getConf('port').then((port) => {
                        console.log(port);
                    })

                    var server = {
                        isRunning: false
                    }
                    console.log(server);
                    result.servers.push(server);
                });
                callback(result);
            });
        }

    ).finally(
        () => {
            ice.destoryCommunicator();
        }
    )
}

var createNewServer = function(options, callback) {

    var result = {
        error: null
    }
    var ice = new IceManager();

    ice.getMeta().then(
        (meta) => {
            meta.newServer().then(
                (newServer) => {
                    console.log(newServer);
                }
            )
        }
    )
    ice.destoryCommunicator();


    callback(result);
}

exports.getServerConfig = getServerConfig;
exports.getServerStatus = getServerStatus;

exports.getServers = getServers;
exports.createNewServer = createNewServer;