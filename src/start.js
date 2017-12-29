/* ----------------------------------------- */
/* ---------------- REQUIRE ---------------- */
/* ----------------------------------------- */

var express         = require('express');
var bodyParser      = require('body-parser');
var config          = require('./config').config;

/* ----------------------------------------- */
/* --------------- INITIALIZE -------------- */
/* ----------------------------------------- */

var app = express();

app.disable('x-powered-by');

var apiRouter = express.Router();
var routes = require('./routes').registeredRoutes;

for (var i = 0; i < routes.length; i++)
{
    for (var j = 0; j < routes[i].length; j++)
    {
        var route = routes[i][j];
        apiRouter[route.method](route.path, route.middlewares, route.handler);
    }
}
    
var homeRouter = express.Router();
app.use("/api", apiRouter);
app.listen(config.apiPort);