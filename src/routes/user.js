
/* ----------------------------------------- */
/* ---------------- REQUIRE ---------------- */
/* ----------------------------------------- */

var userManager       = require("../managers/user");
var middleware          = require("../utils/middleware");

exports.routes = [
    {
        "path": "/server/:server/users",
        "method": "get",
        "middlewares": [middleware.checkAccess],
        handler: function (req, res)
        {
            userManager.getUsers(req, function(result) {
                res.send(result);
            })
        }
    },
    {
        "path": "/server/:server/registeredUsers",
        "method": "get",
        "middlewares": [middleware.checkAccess],
        handler: function (req, res)
        {
            userManager.getRegisteredUsers(req, function(result) {
                res.send(result);
            })
        }
    }
];