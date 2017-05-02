import { AngularFormsTestingPage } from './app.po';

describe('angular-forms-testing App', () => {
  let page: AngularFormsTestingPage;

  beforeEach(() => {
    page = new AngularFormsTestingPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
