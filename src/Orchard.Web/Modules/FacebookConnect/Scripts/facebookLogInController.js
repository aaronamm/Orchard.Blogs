var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var App;
(function (App) {
    var Contorllers;
    (function (Contorllers) {
        $(document).on("fbLoaded", function (e) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            console.log("e=%s, args[0]=%s", e, args[0]);
        });
        var ControllerBase = (function () {
            function ControllerBase() {
            }
            ControllerBase.prototype.delay = function (delayExpression, delay) {
                window.setTimeout(function () {
                    delayExpression();
                }, delay);
            };
            ControllerBase.prototype.redirect = function (url) {
                window.location.href = url;
            };
            ControllerBase.prototype.getCurrentUrl = function () {
                return window.location.href;
            };
            ;
            return ControllerBase;
        }());
        Contorllers.ControllerBase = ControllerBase;
        var FacebookLogInController = (function (_super) {
            __extends(FacebookLogInController, _super);
            function FacebookLogInController(facebookService, $q) {
                var _this = _super.call(this) || this;
                _this.facebookService = facebookService;
                _this.$q = $q;
                _this.testa = 1;
                _this.userName = "";
                _this.isLogIn = false;
                return _this;
            }
            FacebookLogInController.prototype.logIn = function () {
                var _this = this;
                console.log("log in called");
                this.facebookService.getLogInStatus()
                    .then(function (response) {
                    if (response.status === 'connected') {
                        return _this.$q.resolve(response);
                    }
                    else {
                        return _this.facebookService.logIn();
                    }
                })
                    .then(function (response) {
                    return _this.facebookService.getUserInfo(response);
                })
                    .then(function (userInfo) {
                    console.log(userInfo);
                    return _this.facebookService.connect(userInfo);
                })
                    .then(function (response) {
                    _this.isLogIn = true;
                    _this.redirect("/");
                })
                    .catch(function (response) {
                    console.log(response);
                    alert("Error, please reload page and try again");
                })
                    .finally(function () {
                    console.log("finally");
                });
            };
            return FacebookLogInController;
        }(ControllerBase));
        angular.module("facebookConnect")
            .controller("facebookLogInController", ["facebookService", "$q", FacebookLogInController]);
    })(Contorllers = App.Contorllers || (App.Contorllers = {}));
})(App || (App = {}));
