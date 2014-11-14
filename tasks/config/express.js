module.exports = function(grunt) {
    return {
        custom: {
            options: {
                hostname: '0.0.0.0',
                port: 3000,
                base: '.',
                debug: true
            }
        }
    };
};