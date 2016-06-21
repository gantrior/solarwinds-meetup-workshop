/// <reference path="../typings/tsd.d.ts"/>

"use strict";

import { Cleaner } from "../helpers/cleaner";

module.exports = function() {
    let cucumber: cucumber.Hooks = this;
    cucumber.Before((scenario: any) => {
        browser.driver.manage().window().maximize();

        this.context = {};
    });

    cucumber.After(async (scenario: any) => {
        await Cleaner.clean();
    });
};
