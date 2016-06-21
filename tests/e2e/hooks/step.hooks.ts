/// <reference path="../typings/tsd.d.ts"/>

"use strict";

module.exports = function() {
    let cucumber: cucumber.Hooks = this;

    this.registerHandler("AfterStep", function (event, callback) {
        browser.waitForAngular().thenFinally(() => {
            callback();
        });
    });
};
