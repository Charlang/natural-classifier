import { RESTDataSource } from 'apollo-datasource-rest';
import { addDocument, addDocuments, classify, classifications, reTrain, train } from '../natural'

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
        await addDocument(input, output);
        return 'Document Added';
    }
    async addDocuments(document: [{input: string[], output: string}]) {
        await document.forEach(({input, output}) => {
            addDocuments(input, output);
        })
        return 'Document Added';
    }
    async train() {
        train();
        return 'Start Training...';
    }
    async reTrain() {
        await reTrain();
        return 'Start Re Training...';
    }
}

export default ClassifyApi;