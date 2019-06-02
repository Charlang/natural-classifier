import { gql } from 'apollo-server-express';
import { dataSources } from '../datasources';

export const typeDef = gql`
    extend type Query {
        getClassify(input: String): String
        getClassifications(input: String): [Classification]
    }
    type Classification {
        label: String!
        value: Float!
    }
`;

export const resolvers = {
    Query: {
        getClassify: async (_: any, props: {input: string}, { dataSources }: { dataSources: dataSources }) => {
            const result = await dataSources.classifyApi.getClassify(props.input);
            return result;
        },
        getClassifications: async (_: any, props: {input: string}, { dataSources }: {  dataSources: dataSources  }) => {
            const result = await dataSources.classifyApi.getClassifications(props.input);
            return result;
        }
    }
}