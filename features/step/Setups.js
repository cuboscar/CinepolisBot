import { HomePageCinepolis, PageSanPedro } from 'C:/Users/usuario/features/step/pageObject.js';
module.exports = function () {

    this.Given(/^We're in the Cinepolis Web Page$/, function () {

        // Write code here that turns the phrase above into concrete actions
        let Home = new HomePageCinepolis();
        Home.redirect();
    });
    this.Given(/^we were correctly redirected to the schedule of Cinepolis San Pedro$/, function () {
        // Write code here that turns the phrase above into concrete actions
        let sanPedro = new PageSanPedro();
        sanPedro.redirect();
    });
}
