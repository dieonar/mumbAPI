
/* ----------------------------------------- */
/* ---------------- REQUIRE ---------------- */
/* ----------------------------------------- */

var serverManager       = require("../managers/server");

exports.routes = [
    {
        "path": "/getServers",
        "method": "get",
        handler: function (req, res)
        {
            serverManager.getServers(null, function(result) {
                res.send(result);
            })
            
            res.send(result);
        }
    }
];