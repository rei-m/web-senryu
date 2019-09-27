import { GatsbyOnCreatePage } from './types';

export const onCreatePage: GatsbyOnCreatePage<{}> = async ({
  page,
  actions,
}) => {
  const { createPage, deletePage } = actions;
  if (page.path === '/create_senryu/') {
    const oldPage = { ...page };
    page.path = '/senryu/new/';
    if (page.path !== oldPage.path) {
      deletePage(oldPage);
      createPage(page);
    }
    return;
  }
  if (page.path === '/senryu/show/') {
    page.matchPath = '/senryu/:id/';
    createPage(page);
    return;
  }
  if (page.path === '/users/show/') {
    page.matchPath = '/users/:id/';
    createPage(page);
    return;
  }
};
