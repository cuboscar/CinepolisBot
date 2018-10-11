@watch
# Feature: Test
#     Scenario: Taylor Swift
#         Given we're in Wikipedia
#         When we type "Taylor Swift" in search tab
#         When we click "searchButton"
#########
# Feature: Test1
#     Scenario: About Selenium
#         Given we are in Google
#         When we search "Selenium"
#         When we click on the Selenium Website
#         Then we verify if the About Selenium section contains "Selenium is a suite of tools specifically for automating web browsers."
# Feature: Gmail Create
#     Scenario: GMAIL
#         Given we are in Gmail
#         When we select Usar otra cuenta
#         Then we click on crear cuenta
#         Then we add "nombre"
#         And we add "apellido"
#         And we add gmail user
#         And we add contraseña
#         And we confirm contraseña
#########
Feature: Test1
    Scenario: MatchingTimes
        Given We're in the Cinepolis Web Page
        When we select "San Pedro"
        Then we click VER CARTELERA
        Given we were correctly redirected to the schedule of Cinepolis San Pedro
        When we select an hour filter between "11:00" and "19:00"
        #         # up to here both tests are alike
        Then all movies should only have  pertinent schedules between "11:00" and "19:00"

# Feature:Test2
#     Scenario: Matching Movie Menu
#         Given We're in the Cinepolis Web Page
#         When we select "San Pedro"
#         Then we click VER CARTELERA
#         Given we were correctly redirected to the schedule of Cinepolis San Pedro
#         When we select an hour filter between "11" and "13"
#         # up to here both tests are alike
#         When we select any movie
#         #store the hours as well
#         Given we were correctly redirected to the movie's schedule
#         When we compare the available hours from the movie Page
#         Then we should obtain the same hours as the previous page