import { GatsbyOnCreatePage } from './types';

export const onCreatePage: GatsbyOnCreatePage<{}> = async ({
  page,
  actions,
}) => {
  const { createPage } = actions;
  if (page.path.match(/^\/senryu\/.*/)) {
    if (page.path === '/senryu/' || page.path === '/senryu/new/') {
      return;
    }

    page.matchPath = '/senryu/:id';

    createPage(page);
  }
};
