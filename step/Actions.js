import { HomePageCinepolis, PageSanPedro } from 'C:/Users/usuario/features/step/pageObject.js';
module.exports = function () {
    this.When(/^we select "([^"]*)"$/, function (arg1) {
        // Write code here that turns the phrase above into concrete actions
        let Home = new HomePageCinepolis();
        Home.typeCity(arg1);
    });
    this.Then(/^we click VER CARTELERA$/, function () {
        let Home = new HomePageCinepolis();
        Home.clickVerCartelera();
    });
    this.When(/^we select an hour filter between "([^"]*)" and "([^"]*)"$/, function (arg1, arg2) {
        // Write code here that turns the phrase above into concrete actions
        let sanPedro = new PageSanPedro();
        sanPedro.selectHour(arg1, arg2);
    });
    this.Then(/^all movies should only have  pertinent schedules between "([^"]*)" and "([^"]*)"$/, function (arg1, arg2) {
        // Write code here that turns the phrase above into concrete actions
        let sanPedro = new PageSanPedro();
        let arr = sanPedro.obtainSchedules();
        console.log(arr);
        let arr2 = []
        arr.forEach(element => {
            arr2.push(toDate(element, "h:m"))

        });
        let start = toDate(arg1, "h:m");
        let end = toDate(arg2, "h:m");
        arr2.forEach(element => {
            assertHour(element, start, end);

        });

    });
    function toDate(dStr, format) {
        var now = new Date();
        if (format == "h:m") {
            now.setHours(dStr.substr(0, dStr.indexOf(":")));
            now.setMinutes(dStr.substr(dStr.indexOf(":") + 1));
            now.setSeconds(0);
            return now;
        } else
            return "Invalid Format";
    }
    function assertHour(hour, start, end) {
        if (hour < start && hour > end) {
            console.log(hour)
            throw message || "Assertion failed";
        }
        else {
            console.log("Assertion " + hour + " ok");
        }
    }

}

