import morgan from 'morgan';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { RequestOptions } from 'apollo-datasource-rest';
import fs from 'fs';
const fsPromises = fs.promises;

const { HOST = 'localhost', PORT = '3000' } = process.env;

export const context = async ({ req }: { req: RequestOptions }) => {
    return { authorization: ''};
};

import schema from './schema';
import { ClassifyApi } from './datasources';

const dataSources = () => ({
    classifyApi: new ClassifyApi(),
});

export const server = new ApolloServer({
    schema,
    dataSources,
    context,
    introspection: true,
    playground: true,
});
import { insert, deleteNode, INode, ITree, NIL, maximum, minimum, search } from './redBlackTree';

(async () => {
  const app = express();
  app.use(morgan('combined'));

  app.use('/health-check', (_, res) => {
      res.set('Content-Type', 'text/plain');
      res.status(200).send('ok');
  });

  server.applyMiddleware({ app });

  if (!fs.existsSync(`${process.cwd()}/data`)) {
      await fsPromises.mkdir(`${process.cwd()}/data`);
  }
  await app.listen({ host: HOST, port: PORT });
  console.log(`> ✅ 🎊 🎉 🍻 Server is ready at http://${HOST}:${PORT}${server.graphqlPath}`);

  const tree: ITree = {
    root: {
      parent: NIL,
      color: 'BLACK',
      left: NIL,
      right: NIL,
      key: Number.MAX_SAFE_INTEGER,
    },
  };

  console.error(new Date());
  for (let i = 10000000; i > 0 ; i --) {
    insert(tree, { key: i, parent: NIL, color: 'RED', left: NIL, right: NIL });
  }
  console.error(tree);
  console.error(new Date());
  console.error(`Maximum: ${JSON.stringify(maximum(tree.root).key)}`);
  console.error(`Minimum: ${JSON.stringify(minimum(tree.root).key)}`);
  console.error(new Date());
  console.error(`Find: ${search(tree, 1024).key}`);
  console.error(`Find: ${search(tree, 30000).key}`);
  console.error(`Find: ${search(tree, 5000000).key}`);
  console.error(`Find: ${search(tree, 2).key}`);
  console.error(`Delete: ${deleteNode(tree, search(tree, 2))}`);
  console.error(new Date());
})();
