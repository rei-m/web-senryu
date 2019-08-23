interface PageInput<T> {
  path: string;
  component: string;
  layout?: string;
  context?: T;
  matchPath?: string;
}

interface NodeInputBase {
  id: string;
  parent?: string;
  children: string[];
  internal: {
    mediaType?: string;
    type: string;
    content?: string;
    contentDigest?: string;
    description?: string;
  };
}

interface GatsbyActionCreators<T> {
  createPage: (page: PageInput<T>) => void;
  deletePage: (page: PageInput<T>) => void;
  createNode: (node: NodeInputBase & T) => void;
  createRedirect: (opts: {
    fromPath: string;
    isPermanent?: boolean;
    redirectInBrowser?: boolean;
    toPath: string;
  }) => void;
}

export type GatsbyOnCreatePage<T> = (fns: {
  page: PageInput<T>;
  actions: GatsbyActionCreators<T>;
}) => void;
