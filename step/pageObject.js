export
    class HomePageCinepolis {
    constructor(URL, citySelector, verCarteleraSelector) {
        this.URL = 'http://www.cinepolis.com';
        this.citySelector = '#cmbCiudades';
        this.verCarteleraSelector = '.btn.btnEnviar.btnVerCartelera'

    }
    redirect() {
        browser.url(this.URL);
        browser.pause(6000); //Due to additional add
    }
    typeCity(city) {
        browser.selectByVisibleText(this.citySelector, city);
    }
    clickVerCartelera() {
        browser.click(this.verCarteleraSelector)
    }
}
export
    class PageSanPedro {
    constructor(URL, sliderLeftSelector, sliderRightSelector, sliderRangeSelector, timeSelector) {
        this.URL = 'http://www.cinepolis.com/cartelera/san-pedro/';
        this.sliderRangeSelector = `#slider-range > span.ui-slider-pip.ui-slider-pip-`
        this.sliderRightSelector = '#slider-range > a:nth-child(3)'
        this.sliderLeftSelector = '#slider-range > a:nth-child(2)'
        this.timeSelector = 'time.btn.btnhorario.ng-scope'

    }
    timeStamp(hour) {
        switch (hour) {
            case '00:00':
                return '0';
                break;
            case '10:00':
                return '1';
                break;
            case '11:00':
                return '2';
                break;
            case '12:00':
                return '3';
                break;
            case '13:00':
                return '4';
                break;
            case '14:00':
                return '5';
                break;
            case '15:00':
                return '6';
                break;
            case '16:00':
                return '7';
                break;
            case '17:00':
                return '8';
                break;
            case '18:00':
                return '9';
                break;
            case '19:00':
                return '10';
                break;
            case '20:00':
                return '11'; 7
                break;
            case '21:00':
                return '12';
                break;
            case '22:00':
                return '13';
                break;
            case '23:00':
                return '14';
                break;
            case '24:00':
                return '15';
                break;
        }
    }
    redirect() {
        //browser.url(this.URL);
        assertURLState(this.URL === browser.getUrl())
    }
    selectHour(startHour, endHour) {
        let a = this.timeStamp(startHour);
        console.log(a)
        let b = this.timeStamp(endHour);
        console.log(b)
        let dragdrop = this.sliderRangeSelector + a;
        let dragdrop2 = this.sliderRangeSelector + b;
        browser.dragAndDrop(this.sliderLeftSelector, dragdrop);
        browser.dragAndDrop(this.sliderRightSelector, dragdrop2);
    }
    clickVerCartelera() {
        browser.click(this.verCarteleraSelector)
    }
    obtainSchedules() {
        let schedules = browser.elements(this.timeSelector);
        let arr = []
        schedules.value.forEach(element => {
            if (browser.elementIdDisplayed(element.ELEMENT).value === true) {
                arr.push(browser.elementIdText(element.ELEMENT).value);
            }

            //console.log(browser.elementIdDisplayed(element.ELEMENT).value)

        });
        console.log(arr)
        return arr
    }

}
function assertURLState(condition, message) {
    if (!condition) {
        console.log(browser.getUrl)
        throw message || "Assertion failed";
    }
    else {
        console.log("URL Assertion Ok");
    }
}
