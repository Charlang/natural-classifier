import { gql } from 'apollo-server-express';
import { dataSources } from '../datasources';

export const typeDef = gql`
    extend type Query {
        getClassify(input: String): String
        getClassifications(input: String): [Classification]
    }
    extend type Mutation {
        addDocument(input: String, output: String): String
        addDocuments(document: [Documents]): String
        train: String
        reTrain: String
    }
    input Documents {
        input: [String]
        output: String
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
        },
    },
    Mutation: {
        addDocument: async (_: any, props: {input: string, output: string}, { dataSources }: { dataSources: dataSources }) => {
            const result = await dataSources.classifyApi.addDocument(props.input, props.output);
            return result;
        },
        addDocuments: async (_: any, props: { document: [{input: string[], output: string}] }, { dataSources }: { dataSources: dataSources }) => {
            const result = await dataSources.classifyApi.addDocuments(props.document);
            return result;
        },
        train: async (_: any, __: any, { dataSources }: { dataSources: dataSources }) => {
            const result = await dataSources.classifyApi.train();
            return result;
        },
        reTrain: async (_: any, __: any, { dataSources }: { dataSources: dataSources }) => {
            const result = await dataSources.classifyApi.reTrain();
            return result;
        },
    },
}