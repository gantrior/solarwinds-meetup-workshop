/// <reference path="../typings/tsd.d.ts"/>

"use strict";

import * as webdriver from "protractor";

export class AngularJSPage  {
    get yourName(): webdriver.ElementFinder {
        return element(by.model("yourName"));
    };

    get taskList(): webdriver.ElementArrayFinder {
        return element.all(by.repeater("todo in todoList.todos"));
    }

    get addTodoText(): webdriver.ElementFinder {
        return element(by.model("todoList.todoText"));
    };

    get addButton(): webdriver.ElementFinder {
        return element(by.css(`[value="add"]`));
    };

    public async navigate(): Promise<void> {
        console.log(`Navigating to 'http://www.angularjs.org'`);
        await browser.get("http://www.angularjs.org");
    }

    public async addTodo(task: string): Promise<void> {
        await this.addTodoText.sendKeys(task);
        await this.addButton.click();
    }
}
