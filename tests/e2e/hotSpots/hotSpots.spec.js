var HotSpotsPage = require('./hotSpots.po.js');
var Login = require('../login/login.po.js');
var EditHotSpotBucket = require('./editHotSpotBucket.po.js');
var Common = require('../common/common.js');

describe('Hot Spots Page', function () {

    var hotSpotsPage = new HotSpotsPage();
    var login = new Login();
    var editHotSpotBucket = new EditHotSpotBucket();
    var common = new Common();

    beforeAll(function () {
        common.clearDB();
        browser.driver.manage().deleteAllCookies();

        common.goHome();
        login.setLoginUserName('bjaanes');
        login.setPassword('1234');
        login.loginButton.click();
        browser.waitForAngular();
    });

    beforeEach(function () {
        common.goHome();
        common.hotSpotsMenuButton.click();
    });

    it('should not let you add a hot spot bucket without name', function () {
        hotSpotsPage.createButton.click();

        expect(hotSpotsPage.hotSpotBucketNameInputMessage.getText()).toBe('This is required.');
        expect(hotSpotsPage.hotSpotBuckets.count()).toBe(0);
    });

    it('should be possible to add a new hot spot bucket', function () {
        var hotSpotBucketName = 'test1123';

        hotSpotsPage.createHotSpotBucketInput.sendKeys(hotSpotBucketName);
        hotSpotsPage.createButton.click();

        expect(hotSpotsPage.hotSpotBuckets.count()).toBe(1);
        expect(hotSpotsPage.hotSpotBucketName(0).getText()).toBe(hotSpotBucketName);
        expect(hotSpotsPage.hotSpots(0).count()).toBe(0);
    });

    it('should reset the create hot spot bucket field after success', function () {
        var hotSpotBucketName = 'derr';

        hotSpotsPage.createHotSpotBucketInput.sendKeys(hotSpotBucketName);
        hotSpotsPage.createButton.click();

        expect(hotSpotsPage.createHotSpotBucketInput.getAttribute('value')).toBe('');
    });

    it('should be possible to decline a delete of a hot spot bucket', function () {
        hotSpotsPage.hotSpotBucketEditButton(0).click();
        editHotSpotBucket.deleteButton.click();
        editHotSpotBucket.declineDeleteButton.click();

        expect(hotSpotsPage.hotSpotBuckets.count()).toBe(2);
    });

    it('should be possible to delete a hot spot bucket', function () {
        hotSpotsPage.hotSpotBucketEditButton(1).click();
        editHotSpotBucket.deleteButton.click();
        editHotSpotBucket.confirmDeleteButton.click();

        expect(hotSpotsPage.hotSpotBuckets.count()).toBe(1);
    });


    it('should be possible to change hot spot bucket name', function () {
        var newHotSpotBucketName = 'Steve Holt!';
        hotSpotsPage.hotSpotBucketEditButton(0).click();

        editHotSpotBucket.hotSpotBucketNameInput.clear();
        editHotSpotBucket.hotSpotBucketNameInput.sendKeys(newHotSpotBucketName);
        editHotSpotBucket.saveButton.click();

        expect(hotSpotsPage.hotSpotBucketName(0).getText()).toBe(newHotSpotBucketName);
    });

    it('should not be possible to add new hot spots to a bucket without name', function () {
        hotSpotsPage.hotSpotInput(0).sendKeys(protractor.Key.ENTER);

        expect(hotSpotsPage.hotSpots(0).count()).toBe(0);
    });

    it('should be possible to add new hot spot to a bucket', function () {
        var hotSpotName = 'Number One';

        hotSpotsPage.hotSpotInput(0).sendKeys(hotSpotName);
        hotSpotsPage.hotSpotInput(0).sendKeys(protractor.Key.ENTER);

        expect(hotSpotsPage.hotSpots(0).count()).toBe(1);
        common.goHome();
        common.hotSpotsMenuButton.click();
        expect(hotSpotsPage.hotSpots(0).count()).toBe(1);
    });

    it('should be possible to delete a hot spot from a hot spot bucket', function () {
        var hotSpotName = 'Number Two';

        hotSpotsPage.hotSpotInput(0).sendKeys(hotSpotName);
        hotSpotsPage.hotSpotInput(0).sendKeys(protractor.Key.ENTER);
        hotSpotsPage.hotSpotDeleteButton(0, 0).click();

        expect(hotSpotsPage.hotSpots(0).count()).toBe(1);
        common.goHome();
        common.hotSpotsMenuButton.click();
        expect(hotSpotsPage.hotSpots(0).count()).toBe(1);
    });

});