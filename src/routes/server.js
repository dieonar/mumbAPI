
/* ----------------------------------------- */
/* ---------------- REQUIRE ---------------- */
/* ----------------------------------------- */

var serverManager       = require("../managers/server");
var middleware          = require("../utils/middleware");

exports.routes = [
    {
        "path": "/getServers",
        "method": "get",
        "middlewares": [middleware.checkAccess],
        handler: function (req, res)
        {
            serverManager.getServers(req, function(result) {
                res.send(result);
            })
        }
    },
    {
        "path": "/server/:server/config",
        "method": "get",
        "middlewares": [middleware.checkAccess],
        handler: function (req, res)
        {
            serverManager.getServerConfig(req, function(result) {
                res.send(result);
            })
        }
    },
    {
        "path": "/server/:server/status",
        "method": "get",
        "middlewares": [middleware.checkAccess],
        handler: function (req, res)
        {
            serverManager.getServerStatus(req, function(result) {
                res.send(result);
            })
        }
    },
    {
        "path": "/createNewServer",
        "method": "post",
        "middlewares": [middleware.checkAccess],
        handler: function (req, res)
        {
            serverManager.createNewServer(req, function(result) {
                res.send(result);
            })
        }
    }
];