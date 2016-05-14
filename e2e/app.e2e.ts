import { Angularattack2016GhcPage } from './app.po';

describe('angularattack2016-ghc App', function() {
  let page: Angularattack2016GhcPage;

  beforeEach(() => {
    page = new Angularattack2016GhcPage();
  })

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('angularattack2016-ghc works!');
  });
});
