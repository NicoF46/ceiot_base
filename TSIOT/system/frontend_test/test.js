const { Builder, By, until, Key } = require('selenium-webdriver');
const { expect } = require('chai');
var firefox = require('selenium-webdriver/firefox');
let TIMEOUT = 200000;
let TIMEOUT2 = 400000;

// describe('web application test with selenium webdriver', function() {
//   let driver;
//   this.timeout(TIMEOUT)
//   const options = new firefox.Options();

//   before(async function() {
//     driver = new Builder().forBrowser('firefox').build();
//   });  
//   it('check login ask for username', async function() {
//     this.timeout(TIMEOUT);
//     await driver.get('http://localhost:4200');

//     await driver.findElement(By.id('username')).then(element=> element.sendKeys('admin'));	   
//     await driver.findElement(By.id('pwd')).then(element=> element.sendKeys('admin'));	   
//     await driver.findElement(By.id('loginBtn')).then(element=> element.click());	   
//     let element = await driver.wait(until.elementLocated(By.xpath('/html/body/app-root/app-list-user/div/table/tbody/tr[3]/td[3]')),TIMEOUT);
//     let value   = await element.getText();
//     expect(value).to.equal('user1@example.org');	   
//   });
//   after( () =>
//     driver && driver.quit()
//   );
// });

describe('devices web app', function () {

  describe('When I select a device from the list', function () {
    let driver;
    this.timeout(TIMEOUT)
    const options = new firefox.Options();

    before(async function () {
      driver = new Builder().forBrowser('firefox').build();
      this.timeout(TIMEOUT);
      await driver.get('http://localhost:4200/home');

      let item_clicked = await driver.wait(until.elementLocated(By.className('item'), TIMEOUT)).click();
      await driver.wait(until.elementLocated(By.id('highcharts')), TIMEOUT);
    });

    it('Redirects to the correct page', async function () {
      expect(await driver.getCurrentUrl()).to.equal('http://localhost:4200/dispositivo/1/detalle-sensor');
    });

    it('Displays the graph', async function () {
      await driver.findElements(By.id('highcharts')).then(function (elems) {
        var length = elems.length;
        expect(length).to.equal(1);
      });
    });

    it('Displays the chart', async function () {
      await driver.wait(until.elementLocated(By.className('button-solid')), TIMEOUT).click();
      await driver.findElements(By.className('grid-fixed')).then(function (elems) {
        var length = elems.length;
        expect(length).to.equal(1);
      });
    });

    after(() =>
      driver && driver.quit()
    );
  });

  describe('When I access to the home page', function () {
    let driver;
    this.timeout(TIMEOUT)
    const options = new firefox.Options();

    before(async function () {
      driver = new Builder().forBrowser('firefox').build();
      this.timeout(TIMEOUT);
      await driver.get('http://localhost:4200/home');
      await driver.wait(until.elementLocated(By.className('item'), TIMEOUT))
    });

    it('Displays the correct url', async function () {
      expect(await driver.getCurrentUrl()).to.equal('http://localhost:4200/home');
    });

    it('Displays the list of devices', async function () {
      await driver.findElements(By.className('item')).then(function (elems) {
        var length = elems.length;
        expect(length > 0).to.equal(true);
      });
    });

    it('Displays the correct title', async function () {
      var title = await driver.findElement(By.className('title-default'))
      var text = await title.getText();
      expect(text).to.equal('My devices app');
    });

    after(() =>
      driver && driver.quit()
    );
  });
});