import natural from 'natural';
import fs from 'fs';
const fsPromises = fs.promises;

let classifier = new natural.BayesClassifier();

export const addDocument = async (input: string, output: string) => {
    await fsPromises.appendFile(`${process.cwd()}/data/documents`, JSON.stringify({input: [input], output}));
    classifier.addDocument(input, output);
}
export const addDocuments = async (input: string[], output: string) => {
    await fsPromises.appendFile(`${process.cwd()}/data/documents`, JSON.stringify({input, output}));
    classifier.addDocument(input, output);
}

export const train = () => {
        classifier.events.on('trainedWithDocument', function (obj) {
            console.log(obj);
        });
        classifier.train();
    }

export const classify = (input: string) => classifier.classify(input);

export const classifications = (input: string) => classifier.getClassifications(input);
