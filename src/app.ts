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
})();
