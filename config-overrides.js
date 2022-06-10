const webpack = require('webpack');
module.exports = function override(config, env) {
    //do stuff with the webpack config...

    /*let loaders = config.resolve
    loaders.fallback = {
        "child_process": false,
        "fs": false,
        "tls": false,
        "net": false,
        "http": require.resolve("stream-http"),
        "https": false,
        "zlib": require.resolve("browserify-zlib") ,
        "path": require.resolve("path-browserify"),
        "os": require.resolve("os-browserify/browser"),
        "stream": require.resolve("stream-browserify"),
        "util": require.resolve("util/"),
        "crypto": require.resolve("crypto-browserify")
    }*/
    
    return config;
}