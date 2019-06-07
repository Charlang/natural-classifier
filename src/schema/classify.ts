import { gql } from 'apollo-server-express';
import { IDataSources } from '../datasources';

export const typeDef = gql`
    extend type Query {
        getClassify(input: String, classifierName: String!): String
        getClassifications(input: String, classifierName: String!): [Classification]
        getClassifierList: [String]
        getDocument(output: String!, classifierName: String!): String
    }
    extend type Mutation {
        addDocument(input: String!, output: String!, classifierName: String!): String
        removeDocument(output: String!, classifierName: String!): String
        addDocuments(documents: [Documents], classifierName: String!): String
        saveDocuments(classifierName: String!): String
        loadDocuments(classifierName: String!): String
        train(classifierName: String!): String
        loadTrainingModel(classifierName: String!): String
    }
    input Documents {
        input: String
        output: String
    }
    type Classification {
        label: String!
        value: Float!
    }
`;

export const resolvers = {
    Query: {
        getClassify: async (_: any, props: any, { dataSources }: { dataSources: IDataSources }) => {
            const result = await dataSources.classifyApi.getClassify(props.input, props.classifierName);
            return result;
        },
        getClassifications: async (_: any, props: any, { dataSources }: {  dataSources: IDataSources  }) => {
            const result = await dataSources.classifyApi.getClassifications(props.input, props.classifierName);
            return result;
        },
        getClassifierList: async (_: any, __: any, { dataSources }: {  dataSources: IDataSources  }) => {
            const result = await dataSources.classifyApi.getClassifierList();
            return result;
        },
        getDocument: async (_: any, props: any, { dataSources }: {  dataSources: IDataSources  }) => {
            const result = await dataSources.classifyApi.getDocument(props.output, props.classifierName);
            return result;
        },
    },
    Mutation: {
        addDocument: async (_: any, props: any, { dataSources }: { dataSources: IDataSources }) => {
            const result = await dataSources.classifyApi.addDocument(props.input, props.output, props.classifierName);
            return result;
        },
        removeDocument: async (_: any, props: any, { dataSources }: { dataSources: IDataSources }) => {
            const result = await dataSources.classifyApi.removeDocument(props.output, props.classifierName);
            return result;
        },
        addDocuments: async (_: any, props: any, { dataSources }: { dataSources: IDataSources }) => {
            const result = await dataSources.classifyApi.addDocuments(props.documents, props.classifierName);
            return result;
        },
        saveDocuments: async (_: any, props: any, { dataSources }: { dataSources: IDataSources }) => {
            const result = await dataSources.classifyApi.saveDocuments(props.classifierName);
            return result;
        },
        loadDocuments: async (_: any, props: any, { dataSources }: { dataSources: IDataSources }) => {
            const result = await dataSources.classifyApi.loadDocuments(props.classifierName);
            return result;
        },
        train: async (_: any, props: any, { dataSources }: { dataSources: IDataSources }) => {
            const result = await dataSources.classifyApi.train(props.classifierName);
            return result;
        },
        loadTrainingModel: async (_: any, props: any, { dataSources }: { dataSources: IDataSources }) => {
            const result = await dataSources.classifyApi.loadTrainingModel(props.classifierName);
            return result;
        },
    },
};
