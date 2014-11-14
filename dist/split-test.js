/**
 * SplitTest, A library for creating and persisting splits
 * for A/B testing
 */
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define([], factory);
    } else if (typeof exports === 'object') {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = factory();
    } else {
        // Browser globals (root is window)
        root.SplitTest = factory();
    }
}(this, function () {
    /* Utils namespace */
    Utils = {};

    /**
     * Utils.randomChoice returns a random choice from
     * the given values where values is a dictionary of (option, weight)
     */
    Utils.randomChoice = function(values) {
        var choices = [];
        var cumProbabilities = [];
        var total = 0;

        for (prop in values) {
            if (values.hasOwnProperty(prop)) {
                total += values[prop];
                choices.push(prop);
                cumProbabilities.push(total);
            }
        }

        var pick = Math.random() * total;
        for (var i=0, _len=choices.length; i < _len; i++) {
            var cumP = cumProbabilities[i];
            if (cumP > pick) {
                return choices[i];
            }
        }
    }

    /**
     * Utils.getCookie reads a cookie with the given name.
     */
    Utils.getCookie = function(name) {
        var cookieRe = new RegExp(name + "=([^;]+)");
        var match = cookieRe.exec(document.cookie);

        return (match ? match[1] : '');
    };

    /**
     * Utils.setCookie sets a cookie with the given name and value.
     * If a lifetime value is given, the expiry will be set to lifetime
     * seconds in the future. Otherwise, the expiry is 30 days.
     *
     * If domain is given, the cookie is set with that domain.
     */
    Utils.setCookie = function(name, value, domain, lifetime) {
        var expires = new Date();
        var now = (+expires); //type coerce to timestamp

        if (lifetime > 0) {
            // Lifetime (seconds) in to the future
            expires.setTime(now + lifetime * 1000);
        } else {
            // 30 Days in to the future
            expires.setTime(now + 30*24*3600*1000);
        }
        document.cookie = name + "=" + value + "; expires=" +
            expires.toGMTString() + "; path=/; " + (domain && domain !== 'localhost' ? "domain=" + domain : "");
    };

    var SplitTest = function(values, options) {
        options = options || {};
        this.cookieName = "split";
        if (options.namespace) {
            this.cookieName = options.namespace + '-' + this.cookieName;
        }

        this.cookieDomain = options.cookieDomain || window.location.hostname;

        var splitValue = this.getValue();

        if (!splitValue) {
            splitValue = Utils.randomChoice(values);
            this.setValue(splitValue);
        }

    };

    /**
     * SplitTest.init({}) allows you to enter split paramters and
     * probabilities. Sets the current split value only
     * if a current split is not in effect.
     * Total probability will be normalized to 1.
     *
     * Usage:
     *  var split = SplitTest.init({
     *      "A": 0.1,
     *      "B": 0.9
     *  }, {
     *      namespace: "mobify",
     *      lifetime: 15*24*3600 // 15 days in seconds
     *  });
     *
     *  splitVal = split.getValue();
     */
    SplitTest.init = function(values, options) {
        return new SplitTest(values, options);
    };

    /**
     * SplitTest.setValue allows you to explictly set the split value
     * '' (the empty string) is the default state. It will be overriden
     * by calls to randomSplit() for example.
     *
     */
    SplitTest.prototype.setValue = function(value) {
        // Splits are stored for 30 days.
        Utils.setCookie(this.cookieName, value, this.cookieDomain);
    }

    /* SplitTest.getSplit returns the current split */
    SplitTest.prototype.getValue = function() {
        var splitValue = Utils.getCookie(this.cookieName);

        if (splitValue) {
            // Push the session out 30 days
            this.setValue(splitValue);
        }

        return splitValue;
    }

    /**
     * Expose Utils object
     */
    SplitTest.Utils = Utils;

    return SplitTest
}));
