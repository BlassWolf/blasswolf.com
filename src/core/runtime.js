(function () {
    var modules = {};
    window.define = function define(name, deps, fn) {
        function require(name) {
            if (modules.hasOwnProperty(name)) return modules[name]();
            return typeof window[name] === "function"
                ? { default: window[name] }
                : window[name];
        }
        modules[name] = function () {
            var exports = {};
            var _args = [require, exports];

            for (var i = 2; i < deps.length; i++) {
                var dep = require(deps[i]);

                _args.push(dep);
            }
            fn.apply(null, _args);
            return exports;
        };
    };
    window.addEventListener("DOMContentLoaded", function () {
        modules.client();
    });
})();
