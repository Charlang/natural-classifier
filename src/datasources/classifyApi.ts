import { RESTDataSource } from 'apollo-datasource-rest';
import * as Natural from '../natural';

class ClassifyApi extends RESTDataSource {
    constructor() {
        super();
    }
    async getClassifierList() {
        return Natural.getClassifierList();
    }
    async getClassify(input: string, classifierName: string) {
        return Natural.classify(input, classifierName);
    }
    async getClassifications(input: string, classifierName: string) {
        return Natural.classifications(input, classifierName);
    }
    async addDocument(input: string, output: string, classifierName: string) {
        return Natural.addDocument(input, output, classifierName);
    }
    async getDocument(output: string, classifierName: string) {
        return Natural.getDocument(output, classifierName);
    }
    async addDocuments(documents: [{input: string, output: string}], classifierName: string) {
        for (const {input, output} of documents) {
            Natural.addDocument(input, output, classifierName);
        }
        return 'Documents Added.';
    }
    async removeDocument(output: string, classifierName: string) {
        return Natural.removeDocument(output, classifierName);
    }
    async saveDocuments(classifierName: string) {
        return Natural.saveDocuments(classifierName);
    }
    async loadDocuments(classifierName: string) {
        return Natural.loadDocuments(classifierName);
    }
    async train(classifierName: string) {
        return Natural.train(classifierName);
    }
    async loadTrainingModel(classifierName: string) {
        return Natural.loadTrainingModel(classifierName);
    }
}

export default ClassifyApi;
