Feature: AngularJS page test
  As a user
  I want test angularJS page
  So that I will be able to show it works

Background:
    Given I am on 'www.angularjs.org' page

Scenario: Adding task works (new task is added)
    When I add task 'test task'
    Then I should see 3 tasks in the list

Scenario: Adding task works (new task is correct)
    When I add task 'test task'
    Then I should see text of task in index 2 to be 'test task'