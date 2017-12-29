
var routes = [
    require('./routes/server').routes,
    require('./routes/user').routes,
    require('./routes/channel').routes
]

exports.registeredRoutes = routes;