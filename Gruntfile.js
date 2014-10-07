var path = require('path');

module.exports = function(grunt) {

    grunt.initConfig({
        express: {
            custom: {
                options: {
                    hostname: '0.0.0.0',
                    port: 3000,
                    base: '.',
                    debug: true,
                }
            }
        },
        qunit: {
            all: {
              options: {
                timeout: 20000,
                urls: [
                  'http://localhost:3000/tests/index.html',
                ]
              }
            }
        }
    });

    grunt.loadNpmTasks('grunt-express');
    grunt.loadNpmTasks('grunt-contrib-qunit');

    grunt.registerTask('test', ['express', 'qunit']);
    grunt.registerTask('serve', ['express', 'express-keepalive']);
};
