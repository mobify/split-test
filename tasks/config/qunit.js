module.exports = function(grunt) {
    return {
        all: {
            options: {
                timeout: 20000,
                urls: [
                    'http://localhost:3000/tests/index.html',
                ]
            }
        }
    };
};