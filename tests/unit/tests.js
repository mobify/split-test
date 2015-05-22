define([
    'split-test'
], function(SplitTest) {
    var split;

    describe('SplitTest', function() {
        describe('instance', function() {
            it('is defined', function() {
                assert.isDefined(SplitTest);
            });

            it('is a function', function() {
                assert.isFunction(SplitTest);
            });
        });

        describe('init function with defaults', function() {
            beforeEach(function() {
                split = SplitTest.init({A: 0.1, B: 0.9});
            });

            it('is a function', function() {
                assert.isFunction(SplitTest.init);
            });

            it('creates an instance of SplitTest', function() {
                assert.instanceOf(split, SplitTest);
            });

            it('sets cookieName to default with no options', function() {
                assert.equal(split.cookieName, 'split');
            });

            it('sets cookieDomain to default with no options', function() {
                assert.equal(split.cookieDomain, window.location.hostname);
            });

            it('sets lifetime to default with no options', function() {
                assert.equal(split.lifetime, 2592000);
            });
        });

        describe('init function with options', function() {
            beforeEach(function() {
                split = SplitTest.init({'A': 0.5, 'B': 0.5, 'C': 0}, {
                    namespace: 'foo',
                    cookieDomain: 'http://www.foo.com',
                    lifetime: 15000
                });
            });

            it('sets cookieName to custom value with namespace option', function() {
                assert.equal(split.cookieName, 'foo-split');
            });

            it('sets cookieDomain to custom value with domain option', function() {
                assert.equal(split.cookieDomain, 'http://www.foo.com');
            });

            it('sets lifetime to custom value with lifetime option', function() {
                assert.equal(split.lifetime, 15);
            });
        });

        describe('init function split value', function() {
            beforeEach(function() {
                split = SplitTest.init({A: 0.5, B: 0.5, C: 0});
            });

            it('correctly sets the split value', function() {

                var value = split.getValue();

                assert.ok(value === 'A' || value === 'B');
            });

            it('correctly returns the same split value', function() {
                var value = split.getValue();

                assert.equal(value, split.getValue());
            });
        });

        describe('randomChoice function', function() {
            var i;
            var randomChoice = SplitTest.randomChoice;
            var numExperiments;

            beforeEach(function() {
                numExperiments = 1000;
            });

            it('correctly calculates 2-way choices', function() {
                var splits = {
                    'A': 0.7,
                    'B': 0.3
                };
                var counts = {
                    'A': 0,
                    'B': 0
                };

                for (i = 0; i < numExperiments; i++) {
                    counts[randomChoice(splits)]++;
                }

                assert.equal(counts.A + counts.B, numExperiments);

                assert.ok(counts.A > counts.B);
                assert.ok(counts.A < 750 && counts.A > 650, 'A was rolled ' + counts.A + ' times');
                assert.ok(counts.B < 350 && counts.B > 250, 'B was rolled ' + counts.B + ' times');
            });

            it('correctly calculates 3-way choices', function() {
                var splits = {
                    'A': 2,
                    'B': 1,
                    'C': 1
                };
                var counts = {
                    'A': 0,
                    'B': 0,
                    'C': 0
                };

                for (i = 0; i < numExperiments; i++) {
                    counts[randomChoice(splits)]++;
                }

                assert.equal(counts.A + counts.B + counts.C, numExperiments);

                assert.ok(counts.A > counts.B && counts.A > counts.C);
                assert.ok(counts.A < 550 && counts.A > 450, 'A was rolled ' + counts.A + ' times');
                assert.ok(counts.B < 300 && counts.B > 200, 'B was rolled ' + counts.B + ' times');
                assert.ok(counts.C < 300 && counts.C > 200, 'C was rolled ' + counts.C + ' times');
            });
        });

        describe('getValue function', function() {
            it('returns the same value on successive calls', function() {
                var choice;
                var values = {
                    'D': 5
                };

                var split = SplitTest.init(values, {namespace: 'foo'});

                // New SplitTest with the same namespace
                values = {
                    'A': 5,
                    'B': 5,
                    'C': 0
                };
                split = SplitTest.init(values, {namespace: 'foo'});

                choice = split.getValue();

                assert.equal(choice, 'D');
                assert.equal(choice, split.getValue());
            });
        });

        describe('getChoice function aliases getValue', function() {
            it('returns the same value on successive calls', function() {
                var choice;
                var values = {
                    'D': 5
                };

                var split = SplitTest.init(values, {namespace: 'foo'});

                // New SplitTest with the same namespace
                values = {
                    'A': 5,
                    'B': 5,
                    'C': 0
                };
                split = SplitTest.init(values, {namespace: 'foo'});

                choice = split.getChoice();

                assert.equal(choice, 'D');
                assert.equal(choice, split.getChoice());
            });
        });
    });
});
