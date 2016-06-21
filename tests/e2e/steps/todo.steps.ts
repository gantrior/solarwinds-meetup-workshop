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

    let getAllTask = async () => {
        let items = await element.all(by.repeater("t in todoCtrl.todos | orderBy: '-createdAt'"));
        let result = [];
        for (let item of items) {
            let text = await item.element(by.className("id-label-message")).getText();
            result.push(text);
        }

        return result;
    };

    cucumber.Given("I am on '$page'", async (page: string) => {
        await browser.get(page);
        this.context.currentUrl = page;
        todoRestService = new TodoRestService(page);
    });

    cucumber.When("I add task '$taskName'", async (taskName: string) => {
        await element(by.id("inputTask")).sendKeys(taskName);
        await element(by.id("submit-todo-button")).click();

        Cleaner.add(async () => {
            let tasks = await todoRestService.getAll();
            for (let task of tasks) {
                if (task.todoMessage === taskName) {
                    await todoRestService.delete(task._id);
                }
            }
        });
    });

    cucumber.Then("I should see task '$taskName' in the list", async (taskName: string) => {
        let tasks = await getAllTask();
        chai.assert(_(tasks).filter(x => x === taskName).first(), `task '${taskName}' is not found on the page`);
    });
};
