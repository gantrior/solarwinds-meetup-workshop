Feature: Javascript project feature
  As a user
  I want manage orbit
  Because it is cool

@runThis
Scenario: Orbit project can be added
    Given I am on 'http://orbitdev.swdev.local'
       And I am logged in as 'meetup'/'meetup' into orbit
    When I add Project 'meetup'
    Then I should see Project 'meetup' in project tree