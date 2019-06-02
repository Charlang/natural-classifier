import { RESTDataSource } from 'apollo-datasource-rest';

class ClassifyApi extends RESTDataSource {
    constructor() {
        super();
    }
    async getClassify(props: string) {
        return props;
    }
    async getClassifications(props: string) {
        console.error(props);
        return [{
            label: props,
            value: 100
        }];
    }
}

export default ClassifyApi;