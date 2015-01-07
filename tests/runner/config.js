require.config({
    baseUrl: '../../',
    paths: {
        'chai': 'node_modules/chai/chai',
        'mocha': 'node_modules/mocha/mocha',
        'split-test': 'dist/split-test'
    },
    'shim': {
        'mocha': {
            init: function() {
                this.mocha.setup('bdd');
                return this.mocha;
            }
        }
    }
});
