(function(){

    test('SplitTest Exists', function() {
        ok(typeof window.SplitTest !== 'undefined', 'SplitTest Exists');
    });

    test('SplitTest.init()', function() {
        var split = SplitTest.init({
            'A': 0.5,
            'B': 0.5,
            'C': 0
        },{
            namespace: 'mobify'
        });
        var splitValue = split.getValue();
        ok(split instanceof SplitTest, 'SplitTest.init() returns instance of SplitTest');
        ok(splitValue === 'A' || splitValue === 'B');
        ok(splitValue === split.getValue());
    });

    test('SplitTest.randomChoice() works', function() {
        var i;
        var randomChoice = SplitTest.randomChoice;

        // 70:30 between 'A' and 'B'
        var splits = {
            'A': 0.7,
            'B': 0.3
        };
        var counts = {
            'A': 0,
            'B': 0
        };
        var numExperiments = 1000;

        for (i = 0; i < numExperiments; i++) {
            counts[randomChoice(splits)]++;
        }

        equal(counts.A + counts.B, numExperiments);
        ok(counts.A > counts.B);
        ok(
            counts.A < 750 && counts.A > 650,
            'A was rolled ' + counts.A + ' times'
        );
        ok(
            counts.B < 350 && counts.B > 250,
            'B was rolled ' + counts.B + ' times'
        );


        // 2:1:1 between 'A' and 'B' and 'C'
        splits = {
            'A': 2,
            'B': 1,
            'C': 1
        };
        counts = {
            'A': 0,
            'B': 0,
            'C': 0
        };

        for (i = 0; i < numExperiments; i++) {
            counts[randomChoice(splits)]++;
        }

        equal(counts.A + counts.B + counts.C, numExperiments);
        ok(counts.A > counts.B && counts.A > counts.C);
        ok(
            counts.A < 550 && counts.A > 450,
            'A was rolled ' + counts.A + ' times'
        );
        ok(
            counts.B < 300 && counts.B > 200,
            'B was rolled ' + counts.B + ' times'
        );
        ok(
            counts.C < 300 && counts.C > 200,
            'C was rolled ' + counts.C + ' times'
        );
    });

    test('getValue always returns a previous set value.', function(){
        var values = {
            'D': 5
        }
        var split = SplitTest.init(values, {namespace: 'foo'});

        // New SplitTest with the same namespace
        values = {
            'A': 5,
            'B': 5,
            'C': 0
        };
        var split = SplitTest.init(values, {namespace: 'foo'});
        var choice = split.getValue();
        ok(choice === 'D');
        ok(choice === split.getValue());
    });
})();
