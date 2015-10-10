var OverviewPage = require('./overview.po.js');
var Common = require('../common/common.js');

describe('Overview Page', function () {

    var overviewPage = new OverviewPage();
    var common = new Common();

    beforeAll(function () {
        common.clearDB();
        browser.driver.manage().deleteAllCookies();

        browser.get(browser.params.client);
        common.setLoginUserName('bjaanes');
        common.setPassword('1234');
        common.loginButton.click();
        browser.waitForAngular();
    });

    it('should have a help section when there are no entries', function () {
        expect(overviewPage.firstTimeHelp.isPresent()).toBe(true);
    });

});