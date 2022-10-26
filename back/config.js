const config = require("./package.json").projectConfig;

module.exports = {
    mongoConfig: {
        connectionUrl: config.mongoConnectionUrl,
        database: "masjid_finder",
        collections: {
            USERS : "users"
        },
    },
    serverConfig: {
        ip: config.serverIp,
        port: config.serverPort,
    },
    tokenSecret: "masjidfinder_secret",
}