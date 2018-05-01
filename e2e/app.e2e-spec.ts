import { ForumSitePage } from './app.po';

describe('forum-site App', () => {
  let page: ForumSitePage;

  beforeEach(() => {
    page = new ForumSitePage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
