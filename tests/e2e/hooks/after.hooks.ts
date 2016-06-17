/// <reference path="../typings/tsd.d.ts"/>

"use strict";

module.exports = function() {
    let cucumber: cucumber.Hooks = this;
    cucumber.Before((scenario: any) => {
        browser.driver.manage().window().maximize();

        this.context = {};
        // console.log(scenario.getName());
    });

    cucumber.After(async (scenario: any) => {
        // console.log(scenario.getName());
    });
};
