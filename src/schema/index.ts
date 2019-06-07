import { makeExecutableSchema } from 'graphql-tools';
import { merge } from 'lodash';

const Query = `
    type Query {
        _empty: String
    }
`;

const Mutation = `
    type Mutation {
        _empty: String
    }
`;

import {
    typeDef as Classify,
    resolvers as ClassifyResolvers,
} from './classify';

export const schema = makeExecutableSchema({
    typeDefs: [
        Query,
        Mutation,
        Classify,
    ],
    resolvers: merge(
        ClassifyResolvers,
    ),
});

export default schema;
