import natural from 'natural';
import fs from 'fs';
const fsPromises = fs.promises;
import { saveName, saveFile, loadFile, getList} from './utils';
const documentsMap = new Map<string, Map<string, string>>();
const classifierMap = new Map<string, natural.BayesClassifier>();

const createClassifier = async (name: string) => {
    await saveName(name);
    const classifier = new natural.BayesClassifier();
    classifierMap.set(name, classifier);
    return classifier;
}

export const getClassifierList = async () => await getList();

export const addDocument = async (input: string, output: string, classifierName: string) => {
    let documents = documentsMap.get(classifierName);
    if (!documents) {
        documents = new Map<string, string>();
        documentsMap.set(classifierName, documents);
        console.error(`> 🛅 Create new documents for classifier: ${classifierName}!`)
    }
    documents.set(output, input);
    return `Document added!`;
}

export const removeDocument = async (output: string, classifierName: string) => {
    const documents = documentsMap.get(classifierName);
    if (documents) {
        documents.delete(output);
        return `Document for ${output} is deleted from classifier ${classifierName}`;
    }
    return `Document not found!`;
}

export const getDocument = async (output: string, classifierName: string) => {
    const documents = documentsMap.get(classifierName);
    if (documents) {
        return documents.get(output);
    }
    return '';
}

export const loadDocuments = async (classifierName: string) => {
    const documents = await loadFile(classifierName + '.doc');
    if (documents) {
        documentsMap.set(classifierName, new Map(documents));
        return `Successfully load documents for classifier: ${classifierName}`;
    } else {
        return `Failed to load documents for classifier: ${classifierName}`;
    }
}

export const saveDocuments = async (classifierName: string) => {
    const documents = documentsMap.get(classifierName);
    if (documents) {
        await saveFile(classifierName + '.doc', JSON.stringify([...documents]));
        console.log(`> ✅ Successfully save documents for classifier: ${classifierName}.`)
        return `Document saved for classifier: ${classifierName}.`;
    } else {
        console.error(`>❗️ Could not found the doc with ${classifierName}!`);
        return `Failed to save classifier: ${classifierName}.`;
    }
}

export const train = async (classifierName: string) => {
    const classifier = await createClassifier(classifierName);
    const documents = documentsMap.get(classifierName);
    if (documents) {
        for (const [output, input] of documents) {
            classifier.addDocument(input, output);
            console.log(`Document: input[${input}], output[${output}] added.`)
        }
        classifier.events.on('trainedWithDocument', function (obj) {
            console.log(obj);
        });
        await classifier.train();
        await classifier.save(`${process.cwd()}/data/${classifierName}.model.json`, () => {
            console.log(`> ✅ Successfully trained a model for documents ${classifierName}.`);
        });
        return "Training success!"
    } else {
        console.error(`>❗️No documents exist of classifier ${classifierName} for training!`);
        return 'Documents not exist!'
    }
}

export const loadTrainingModel = async (classifierName: string) => {
    const fileName = `${process.cwd()}/data/${classifierName}.model.json`;
    console.log(`🛫 Loading training model . . . .`);
    if (!fs.existsSync(fileName)) {
        console.error(`>❗️Trained module file: ${classifierName} not exist!`);
        throw new Error(`Trained module file: ${classifierName} not exist!`)
    }
    natural.BayesClassifier.load(fileName, null, async (error, classifier: natural.BayesClassifier) => {
        console.log(`> ✅ Successfully load ${fileName}.`);
        await saveName(classifierName);
        classifierMap.set(classifierName, classifier);
        console.log(`> 🔁 The classifier ${classifierName} in the memory is updated.`);
    });
    return "Starting loading..."
}

export const classify = (input: string, classifierName: string) => {
    const classifier = classifierMap.get(classifierName);
    if (classifier) {
        return classifier.classify(input);
    }
}

export const classifications = (input: string, classifierName: string) => {
    const classifier = classifierMap.get(classifierName);
    if (classifier) {
        return classifier.getClassifications(input);
    }
}
