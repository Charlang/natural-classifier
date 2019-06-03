import fs from 'fs';
const fsPromises = fs.promises;

const getList = async () =>
    JSON.parse(await fsPromises.readFile(`${process.cwd()}/data/list.json`, {encoding: 'utf8'}));

const saveName = async (name: string) => {
    const list: string[] = JSON.parse(
        await fsPromises.readFile(`${process.cwd()}/data/list.json`, {encoding: 'utf8'})
    );
    list.push(name);
    await fsPromises.writeFile(`${process.cwd()}/data/list.json`, JSON.stringify(list));
    return true;
};

const saveFile = async (name: string, data: [{input: string, output: string}]) => {
    await fsPromises.writeFile(`${process.cwd()}/data/${name}.json`, JSON.stringify(data));
    return true;
}