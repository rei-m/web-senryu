import { GatsbyOnCreatePage } from './types';

export const onCreatePage: GatsbyOnCreatePage<{}> = async ({
  page,
  actions,
}) => {
  const { createPage } = actions;
  if (page.path === '/senryu/show/') {
    page.matchPath = '/senryu/show/:id/';
    createPage(page);
    return;
  }
  if (page.path === '/users/show/') {
    page.matchPath = '/users/:id/';
    createPage(page);
    return;
  }
};
