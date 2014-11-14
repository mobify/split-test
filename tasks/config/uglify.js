module.exports = function(grunt) {
    return {
        options: {
            banner: '/*! <%= pkg.name %> <%= pkg.version %> (<%= pkg.repository.url%>) */\n'
        },
        build: {
            files: {
                'dist/split-test.min.js': 'src/js/split-test.js'
            }
        }
    };
};