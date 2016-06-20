/// <reference path="../typings/tsd.d.ts"/>

"use strict";

let chai = require("chai");
chai.use(require("chai-as-promised"));
let expect: Chai.ExpectStatic = chai.expect;

import { AngularJSPage } from "../pageObjects/angularjs.pageObject";

module.exports = function() {
    let angularPage = new AngularJSPage();
    let cucumber: cucumber.StepDefinitions = this;

    cucumber.Given("I am on '$page'", async (page: string) => {
        await browser.get(page);
    });

    cucumber.Given(/^I am logged in as \'(.+)\'\/\'(.+)\'(?: into orbit)?$/, async (username: string, password: string) => {
        await element(by.id("inputUser")).sendKeys(username);
        await element(by.id("inputPassword")).sendKeys(password);
        await element(by.id("btnSignIn")).click();
        await browser.waitForAngular();
    });

    cucumber.When("I add Project '$projectName'", async (projectName: string) => {
        await element(by.id("btnShowFilter")).click();
        await element(by.id("inputFilter")).sendKeys("root");
        await element(by.className("tree-label")).click();
        await element(by.id("btnProjectSettings")).click();
        await element(by.id("btnCreateSubProject")).click();
        await element(by.id("inputProjectName")).sendKeys(projectName);
        await element(by.id("btnSave")).click();
    });

    cucumber.Then("I should see Project '$projectName' in project tree", async (projectName: string) => {
        await element(by.id("btnShowFilter")).click();
        await element(by.id("inputFilter")).clear();
        await element(by.id("inputFilter")).sendKeys(projectName);
        let elements = await element.all(by.className("tree-label"));
        let found = false;
        for (let item of elements) {
            let text = await item.getText();
            if (text === projectName) {
                found = true;
                break;
            }
        }

        expect(found, `I don't see any '${projectName}' in project tree`);
    });

    cucumber.When("I add JavaScript project", async (table: any) => {
        for (let row of table.hashes()) {
            await element(by.xpath("//html/body/div[2]/div[6]/div[2]/div[2]/div/table/thead/tr/th[3]/a")).click();
            await element(by.xpath("//html/body/div[2]/div[6]/div[2]/div[2]/div/form/div[1]/input")).sendKeys(row.name);
            await element(by.xpath("//html/body/div[2]/div[6]/div[2]/div[2]/div/form/div[2]/input")).sendKeys(row.website);
            await element(by.xpath("//html/body/div[2]/div[6]/div[2]/div[2]/div/form/textarea")).sendKeys(row.description);
            await element(by.xpath(`//html/body/div[2]/div[6]/div[2]/div[2]/div/form/button[1]`)).click();
        }
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
