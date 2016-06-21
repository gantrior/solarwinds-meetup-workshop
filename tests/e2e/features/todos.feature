Feature: Todos
  As a user
  I want manage tasks
  Because it is cool

Background:
    Given I am on 'https://solarwinds-meetup-workshop.herokuapp.com'

@runThis
Scenario: Task can be added
    When I add task 'test task'
    Then I should see task 'test task' in the list

Scenario: Empty task display required message
    When I try to add task ''
    Then I should see validation message 'Todo field is required'

Scenario: Short task display required message
    When I try to add task 'test'
    Then I should see validation message 'Min of 5 chars'

Scenario: Empty list display required message
    Given the task list is empty
    Then I should see message 'Nothing to do. Go play outside :D'

Scenario: Task can be deleted
    Given there are following tasks
    | name  |
    | task1 |
    | task2 |
    | task3 |
    | task4 |
    | task5 |
    When I delete task 'task3'
    Then I should see following tasks in the list of tasks
    | name  |
    | task1 |
    | task2 |
    | task4 |
    | task5 |

Scenario: Task can be added via clicking on Add button
    When I try to add task 'test1' clicking on Add button
    Then I should see task 'test1' in the list

Scenario: Task can be added via enter
    When I try to add task 'test1' using enter
    Then I should see task 'test1' in the list

Scenario: Single task can be added
    Given the task list is empty
    When I add 1 task
    Then I should see 1 task in the list of tasks

Scenario: 100 tasks can be added
    Given the task list is empty
    When I add 100 tasks
    Then I should see 100 tasks in the list of tasks
