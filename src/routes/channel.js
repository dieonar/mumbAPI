/* ----------------------------------------- */
/* ---------------- REQUIRE ---------------- */
/* ----------------------------------------- */

var channelManager       = require("../managers/channel");
var middleware          = require("../utils/middleware");

exports.routes = [
    {
        "path": "/server/:server/channels",
        "method": "get",
        "middlewares": [middleware.checkAccess],
        handler: function (req, res)
        {
            channelManager.getChannels(req, function(result) {
                res.send(result);
            })
        }
    }
];