var _              = require('lodash'),
    configLocal,

    config;

config = {
    mail: {
        options: {
            host: 'smtp.yourmailserver.com',
            port: 465,
            secure: true,
            service: 'yourmailserver',
            auth: {
                user: 'user@yourmailserver.com',
                pass: 'yourpassword'
            }
        },
        from: '"myNotifyMail" <myNotifyMail@self.com>'
    },
    port: 10001
};

try {
    configLocal = require('./config_local.js');
}catch (error) {
    console.log("May be you need config_local.js");
}

if (configLocal) {
    _.merge(config, configLocal);
}

module.exports = config;
