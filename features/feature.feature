@watch

Feature: Test1y2
    Scenario: MatchingTimes
        Given We're in the Cinepolis Web Page
        When we select "San Pedro"
        Then we click VER CARTELERA
        Given we were correctly redirected to the schedule of Cinepolis San Pedro
        When we select an hour filter between "11:00" and "23:00"
        #         # up to here both tests are alike
        Then all movies should only have  pertinent schedules
        When data is retrieved from movies
        Then Location and schedules from the city page should be able to match for each movie

