# Prerequisite

## Clone the code

    git clone https://github.com/gantrior/solarwinds-meetup-workshop.git
    cd solarwinds-meetup-workshop

## Install NodeJS at least version 5.0+
On Windows for example using [chocolatey](http://www.chocolatey.org/). Run those commands with elevated permissions: 

Install chocolatey

    @powershell -NoProfile -ExecutionPolicy Bypass -Command "iex ((new-object net.webclient).DownloadString('https://chocolatey.org/install.ps1'))" && SET PATH=%PATH%;%ALLUSERSPROFILE%\chocolatey\bin

Install nodejs

    choco install nodejs -version 5.10.1

## Install Visual Studio Code

    choco install visualstudiocode

# Initialize:

    npm run init

# How to run the tests:

1. Open in Visual Studio Code and run 
2. Open a new cmdline and run [Protractor](http://www.protractortest.org#/): ./node_modules/.bin/protractor protractor.conf.js

# Code structure

* `tests/e2e/features/*` - here are all cucumber *.feature files
* `tests/e2e/helpers/*` - helper classes
  * `cleaner.ts` - contains class which helps you with test data cleanup. See bellow
  * `todoRestService.ts` - class which helps you with application REST API. See bellow
* `tests/e2e/hooks/*` - cucumber hooks (code which is executed for every scenario/step)
* `tests/e2e/steps/*` - cucumber step definitions (code in protractor)
* `tests/e2e/typings/*` - typings information
* `gulp.config.js` - configuration for [gulp](http://gulpjs.com) tasks 
* `gulpfile.js` - [gulp](http://gulpjs.com) tasks.
* `protractor.conf.js` - main configuration file for [protractor](http://www.protractortest.org#/).
* `tsconfig.json` - typescript configuration file
* `tslint.json` - tslint rules for code style
* `package.json` - npm configuration (with all dependencies)

## Cleaner
In order to cleanup after test finish the project is setup to call `Cleaner.clean()` after every scenario in reverse order in which it was added (to ensure that objects are removed correctly). 
This is needed when you are creating objects in stateful system (with database)

Subscribe cleaner methods using `Cleaner.add()`. Like this: 

    Cleaner.add(async () => await todoRestService.delete(...));

## TodoRestService 
The application has REST backend which which you can:
* Get tasks
* Create tasks
* Delete tasks

and class `TodoRestService` helps you doing that without need to know what routes/methods you need to call on API

## Cucumber hooks
There are following hooks defined: 
* *Before* (`after.hooks.ts`) - before every scenario there is cleaned up "context" variable which you might use for sending the data from step to step
* *After* (`after.hooks.ts`) - after every scenario there is called `Cleaner.clean()` to remove all created objects
* *AfterStep* (`step.hooks.ts`) - after every step (Given/When/Then) it synchronizes with Angular (just to make the test flow correct)

# What knowledge you will need

## *How to work with cucumber tables*: 
When steps have a data table, they are passed an object with methods that can be used to access the data.
`hashes()` method returns an array of objects where each row is converted to an object (column header is the key)

for example:

    Given ...
        | name  |
        | task1 |

could have following step:

    cucumber.Given("...", async (table: any) => {
        for (let item of table.hashes()) {
            let name = item.name;
        }
    });

for more info [see cucumber examples](https://github.com/cucumber/cucumber-js/blob/master/features/data_tables.feature)

## *How to locate elements with protractor*:
In protractor exist folloing methods which you can use for locating elements: 

* `element(by.<locatorType>("..."))` - this returns promise on element which it found on the page (first if there are more of them)
* `element.all(by.<locatorType>("...")) - this returns promise on all elements found with this locator` 
* `element(by.<locatorType>("...").element(by.<locatorType>("...")))` - find child element of some specific element

Each of these element contains methods like:
* `click()` - clicks the element and returns promise indicating that operation finished
* `sendKeys("...")` - type something with keyboard into element and returns promise indicating that operation finished

## *Understand promises and async/await*
Each protractor/selenium action returns asynchronous Promise indicating that operation finished. Standard way is register continuation action with "then", but typescript (and ES2016) 
let us do something async/await pattern, which lets you work with asynchronous code as it was continuous. 

Example: Normal javascript asynchronous method:

    function doAction(callback) {
        element(by.id("test")).click().then(function() {
            callback();
        })
    }

with async/await you usually do this:

    function async doAction(): Promise<void> {
        await element(by.id("test")).click();
    }

In cucumber steps if step returns Promise, cucumber automatically waits for the promise. So we defined every cucumber step as "async" so that it returns promise and we "await" every asynchronous operations.




