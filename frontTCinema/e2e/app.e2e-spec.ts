import { FrontTCinemaPage } from './app.po';

describe('front-tcinema App', function() {
  let page: FrontTCinemaPage;

  beforeEach(() => {
    page = new FrontTCinemaPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
