/// <reference path="../typings/tsd.d.ts"/>

"use strict";

let chai = require("chai");
chai.use(require("chai-as-promised"));
let expect: Chai.ExpectStatic = chai.expect;

import { AngularJSPage } from "../pageObjects/angularjs.pageObject";

module.exports = function() {
    let angularPage = new AngularJSPage();
    let cucumber: cucumber.StepDefinitions = this;

    cucumber.Given(/^I am on '(.*)' page$/, async (expectedPage: string) => {
        await angularPage.navigate();
    });

    cucumber.When("I add task '$taskName'", async (taskName: string) => {
        await angularPage.addTodo(taskName);
    });

    cucumber.Then(/^I should see (\d*) tasks in the list$/, async (expectedTaskCount: string) => {
        await expect(angularPage.taskList.count()).to.eventually.equal(parseInt(expectedTaskCount));
    });

    cucumber.Then(/^I should see text of task in index (\d*) to be '(.*)'$/, async (taskIndex: string, expectedTaskName: string) => {
        await expect(angularPage.taskList.get(parseInt(taskIndex)).getText()).to.eventually.equal(expectedTaskName);
    });
};
