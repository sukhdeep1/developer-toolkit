var nconf = require("nconf");

exports.load = function(pathToFile){
    nconf
        .argv()
        .env()
        .file({ file: pathToFile });

    return this;
};

exports.get = function(key){
    return nconf.get(key);
};
