import { RESTDataSource } from 'apollo-datasource-rest';
import { addDocument, addDocuments, classify, classifications, train } from '../natural'

class ClassifyApi extends RESTDataSource {
    constructor() {
        super();
    }
    async getClassify(input: string) {
        return classify(input);
    }
    async getClassifications(input: string) {
        return classifications(input);
    }
    async addDocument(input: string, output: string) {
        addDocument(input, output);
        return 'Document Added';
    }
    async addDocuments(document: [{input: string[], output: string}]) {
        document.forEach(({input, output}) => {
            addDocuments(input, output);
        })
        return 'Document Added';
    }
    async train() {
        train();
        return 'Start Training...';
    }
}

export default ClassifyApi;