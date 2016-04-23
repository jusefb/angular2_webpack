
describe("Try the App", function(){
    it("Should load the app in the browser", function(){
        browser.get("/");

        var el = element(by.tagName('main-app'));
        expect(el.getInnerHtml()).not.toBeNull();
    });
});