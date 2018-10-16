import { HomePageCinepolis, PageSanPedro, PageMovie } from 'C:/Users/usuario/CinepolisBot/features/pageObjects/pageObject.js';
module.exports = function () {
    let movies = []
    let timeInit = ""
    let timeFinish = ""
    let city = ""
    this.When(/^we select "([^"]*)"$/, function (arg1) {
        // Write code here that turns the phrase above into concrete actions
        let Home = new HomePageCinepolis();
        Home.typeCity(arg1);
        city = arg1
    });
    this.Then(/^we click VER CARTELERA$/, function () {
        let Home = new HomePageCinepolis();

        Home.clickVerCartelera();

    });
    this.When(/^we select an hour filter between "([^"]*)" and "([^"]*)"$/, function (arg1, arg2) {
        // Write code here that turns the phrase above into concrete actions
        let sanPedro = new PageSanPedro();
        //browser.pause(20000); //20 segundos para cambiar de día-no incluido en el test case; solo usado dado que cinepolis ya no quiso jalar jeje
        sanPedro.selectHour(arg1, arg2);
        timeInit = arg1;
        timeFinish = arg2;

        // console.log(sanPedro.timeFinish);
        // console.log(sanPedro.timeInit);
    });
    this.Then(/^all movies should only have  pertinent schedules$/, function () {
        // Write code here that turns the phrase above into concrete actions
        let sanPedro = new PageSanPedro();
        let arr = sanPedro.obtainSchedules();
        //console.log(arr);
        let arr2 = []
        arr.forEach(element => {
            arr2.push(toDate(element, "h:m"))

        });
        let start = toDate(timeInit, "h:m");
        console.log(timeInit + " is start time")
        let end = toDate(timeFinish, "h:m");
        console.log(timeFinish + " is end time")
        arr2.forEach(element => {
            assertHour(element, start, end);

        });

    });
    this.When(/^data is retrieved from movies$/, function () {
        // Write code here that turns the phrase above into concrete actions
        let Home = new HomePageCinepolis();
        let sanPedro = new PageSanPedro();
        let array = browser.elements(sanPedro.MoviesTag).value//browser.elementIdText(browser.elements(sanPedro.MoviesTag).value)
        let jsonObj = []
        array.forEach((element, i) => {
            let movieTitle = browser.elementIdText(element.ELEMENT).value.split("\n")[0]
            let schedulesUnOrgranized = []
            browser.elementIdText(element.ELEMENT).value.split("\n").forEach(elem => {
                if (elem.includes(":") && !elem.includes("a") && !elem.includes("e") && !elem.includes("i") && !elem.includes("o") && !elem.includes("u") && !elem.includes("A") && !elem.includes("E") && !elem.includes("I") && !elem.includes("O") && !elem.includes("U")) {
                    schedulesUnOrgranized.push(elem);
                }
            });
            let schedulesOrganized
            let schedules = []
            schedulesOrganized = schedulesUnOrgranized.forEach(element => {
                if (element.length > 5) {
                    let index = (element.length / 5) - 1;
                    let separation = []
                    while (index != 0) {
                        console.log(index)
                        element = element.spliceStr(5 * index, 0, "/")//.split("/")
                        // console.log("separation:")
                        //console.log(element)
                        index--;
                    }
                    separation = element.split("/")
                    separation.forEach(element => {
                        schedules.push(element)
                    });
                } else {
                    schedules.push(element)
                }
            });
            let liga = (browser.getAttribute('//img[@alt="' + movieTitle + '"]/../../../div/header/span', 'data-moviekey'));
            let item = {}
            item["movie"] = movieTitle;
            item["index"] = i;
            item["horarios"] = schedules;
            item["link"] = Home.URL + "/pelicula/" + liga
            // item ["schedules"] = email;
            jsonObj.push(item)
        });
        //console.log(jsonObj)
        movies = jsonObj
        //console.log(sanPedro.movies)

        //console.log(jsonObj);

        //console.log(browser.elementIdText(browser.elements(sanPedro.MoviesTag).value[4].ELEMENT).value.split("\n"))
    });
    this.Then(/^Location and schedules from the city page should be able to match for each movie$/, function () {
        // Write code here that turns the phrase above into concrete actions
        let pageMovie = new PageMovie();
        let sanPedro = new PageSanPedro();
        sanPedro.movies = movies;
        console.log(movies)
        //console.log(city)
        movies.forEach(element => {
            browser.pause(6000)
            browser.url(element.link)
            //console.log(browser.getText(pageMovie.CiudadesTagSelector));
            if (browser.getText(pageMovie.CiudadesTagSelector) != city) {
                console.warn("This movie, '" + element.movie + "' did not maintain City Filter; Hours cannot be compared")
            } else if (browser.getText(pageMovie.CiudadesTagSelector) === city) {
                console.log("Movie '" + element.movie + "' did maintain city filter")
                let horariosVisibles = []
                browser.elements('time.btn.ng-scope').value.forEach(element => {
                    if (browser.elementIdDisplayed(element.ELEMENT)) {
                        horariosVisibles.push(browser.elementIdText(element.ELEMENT).value)

                    }
                })
                let a = true
                console.log(horariosVisibles)
                let horariosAnterior = element.horarios
                horariosAnterior.forEach((element) => {
                    if (!horariosVisibles.includes(element) && horariosAnterior.length === horariosVisibles.length) {
                        a = false;
                    }
                });
                if (a === false) {
                    throw "The movie '" + element.movie + "' did not maintain schedules"
                } else {
                    console.log("The movie '" + element.movie + "' did maintain schedules; everything is OK here")
                }

            }
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
String.prototype.spliceStr = function (idx, rem, str) {
    return this.slice(0, idx) + str + this.slice(idx + Math.abs(rem));
};

