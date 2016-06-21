/// <reference path="../typings/tsd.d.ts"/>

"use strict";

import * as chai from "chai";
import * as _ from "lodash";
import { Cleaner } from "../helpers/cleaner";
import { TodoRestService } from "../helpers/todoRestService";

// usage: 
//   await sleep(<miliseconds>);
let sleep = require("sleep-promise");

module.exports = function() {
    let cucumber: cucumber.StepDefinitions = this;
    let todoRestService: TodoRestService = null;

    cucumber.Given("I am on '$page'", async (page: string) => {
        await browser.get(page);
        this.context.currentUrl = page;
        todoRestService = new TodoRestService(page);
    });
};
