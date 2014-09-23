(function(){

    test("SplitTest Exists", function() {
        ok(typeof window.SplitTest !== "undefined", "SplitTest Exists");
    });

    test("SplitTest.init()", function() {
        var split = SplitTest.init({
            'A': 0.5,
            'B': 0.5,
            'C': 0
        },{
            namespace: 'mobify'   
        });
        var splitValue = split.getValue();
        ok(split instanceof SplitTest, "SplitTest.init() returns instance of SplitTest")
        ok(splitValue === "A" || splitValue === "B");
        ok(splitValue === split.getValue());
    });

    test("SplitTest.Utils.randomChoice() works", function(){
        var values = {
            "A": 5,
            "B": 5,
            "C": 0
        };

        var choice = SplitTest.Utils.randomChoice(values);
        ok(choice === "A" || choice === "B");
    });

    test("getValue always returns a previous set value.", function(){
        var values = {
            "D": 5,
        }
        var split = SplitTest.init(values, {namespace: 'foo'});

        // New SplitTest with the same namespace
        var values = {
            "A": 5,
            "B": 5,
            "C": 0
        };
        var split = SplitTest.init(values, {namespace: 'foo'});
        var choice = split.getValue();
        ok(choice === "D");
        ok(choice === split.getValue());
    });
})();
