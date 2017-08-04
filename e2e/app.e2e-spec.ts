import { BinariksTaskPage } from './app.po';

describe('binariks-task App', () => {
  let page: BinariksTaskPage;

  beforeEach(() => {
    page = new BinariksTaskPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
