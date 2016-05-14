export class Angularattack2016GhcPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('angularattack2016-ghc-app h1')).getText();
  }
}
