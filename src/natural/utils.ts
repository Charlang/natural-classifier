import fs from 'fs';
const fsPromises = fs.promises;
const LIST_NAME = '/data/classifiers.list.json';

export const getList = async () => {
    if (fs.existsSync(`${process.cwd()}${LIST_NAME}`)) {
        return JSON.parse(await fsPromises.readFile(`${process.cwd()}${LIST_NAME}`, {encoding: 'utf8'}));
    } else {
        console.error('❗️List not exist!');
        return [];
    }
};

export const saveName = async (name: string) => {
    const list: string[] = await getList();
    if (!list.includes(name)) {
        list.push(name);
        await fsPromises.writeFile(`${process.cwd()}${LIST_NAME}`, JSON.stringify(list));
    }
    return true;
};

export const saveFile = async (name: string, data: string) => {
    await fsPromises.writeFile(`${process.cwd()}/data/${name}.json`, data);
    return true;
};

export const loadFile = async (name: string) => {
    const data = JSON.parse(await fsPromises.readFile(`${process.cwd()}/data/${name}.json`, {encoding: 'utf8'}));
    return data;
};
