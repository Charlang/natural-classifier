import natural from 'natural';
import fs from 'fs';
const fsPromises = fs.promises;

let classifier = new natural.BayesClassifier();

let hasDocuments = false;

let isNotEmpty = async () => {
    const stat = await fsPromises.stat(`${process.cwd()}/data/documents`);
    console.log(`Document Size: ${stat.size}`);
    return stat.size > 0;
}

export const addDocument = async (input: string, output: string) => {
    hasDocuments = hasDocuments || await isNotEmpty();
    await fsPromises.appendFile(`${process.cwd()}/data/documents`,
            hasDocuments ? 
            `,${JSON.stringify({input: [input], output})}`
            :
            JSON.stringify({input: [input], output})
        );
    hasDocuments = true;
    classifier.addDocument(input, output);
}
export const addDocuments = async (input: string[], output: string) => {
    hasDocuments = hasDocuments || await isNotEmpty();
    await fsPromises.appendFile(`${process.cwd()}/data/documents`,
            hasDocuments ?
            `,${JSON.stringify({input, output})}`
            :
            JSON.stringify({input, output})
        );
    hasDocuments = true;
    classifier.addDocument(input, output);
}

export const train = () => {
        classifier.events.on('trainedWithDocument', function (obj) {
            console.log(obj);
        });
        classifier.train();
    }

export const reTrain = async () => {
    console.log(`Re Train starting`);
    classifier = new natural.BayesClassifier();
    const data = await fsPromises.readFile(`${process.cwd()}/data/documents`, {encoding: 'utf8'});
    const documents: [{input: string[], output: string}] = JSON.parse(`[${data}]`);
    documents.forEach(({input, output}) => classifier.addDocument(input, output));
    classifier.events.on('trainedWithDocument', function (obj) {
        console.log(obj);
    });
    classifier.train();
}

export const classify = (input: string) => classifier.classify(input);

export const classifications = (input: string) => classifier.getClassifications(input);
