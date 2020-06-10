import { existsSync, statSync, readFileSync, writeFileSync } from 'fs';
import { join, parse, sep } from 'path';
import { red } from 'colorette';

import { walker } from './walker';
import { extensionMap } from '../constants';
import { IndexEntryMap, IndexFileEntry } from '../types';
import { convertPascalToSnakeCase, convertSnakeToCapitalized } from './strings';


/**
 * Simple function that will map file name to relevant language files
 * Can be used to get stats for each algorithm like language, file size
 * @param dirPath Path of directory to be indexed
 */
const indexer = (dirPath: string) => {
    const obj: IndexEntryMap = {};

    const filesList = walker(dirPath);

    filesList
        .filter(f => !f.endsWith(".md")) // only index language files
        .forEach(file => {
            const { ext, name, dir, base } = parse(file);
            const { size } = statSync(file);
            const newName = convertPascalToSnakeCase(name);

            const splitPath = dir.split(sep);
            let topic = splitPath[splitPath.indexOf('algorithms') + 1];
            topic = convertSnakeToCapitalized(topic);

            const lang = extensionMap[ext];

            if (newName in obj) {
                const newFileEntry: IndexFileEntry = {
                    base,
                    lang,
                    size,
                    ext: ext.slice(1)
                };

                obj[newName] = {
                    ...obj[newName],
                    files: [...obj[newName].files, newFileEntry]
                };
            } else {
                obj[newName] = {
                    dir,
                    topic,
                    files: [
                        {
                            base,
                            lang,
                            size,
                            ext: ext.slice(1)
                        }
                    ]
                };
            }
        });

    return obj;
}

/**
 * Will ensure that index file is always upto date
 * 
 * This will only index the directory where the algorithm is present 
 * and update index.json file, given a index.json file exists.
 * 
 * If not, it will index whole algorithms directory and write it to index.json
 * @param algorithm 
 */
const ensureIndexes = (algorithm: string) => {
    const indexFilePath = join(__dirname, '..', 'index.json');

    // Check if index.json is present
    if (existsSync(indexFilePath)) {
        // Index only specific directory containing given algorithm
        const indexObj: IndexEntryMap = JSON.parse(readFileSync(indexFilePath, 'utf8'));

        if (algorithm in indexObj) {
            const existingEntry = indexObj[algorithm];
            const updatedIndexObj = indexer(existingEntry.dir);
            const newEntry = updatedIndexObj[algorithm];

            // write updated indexes to index.json
            writeFileSync(
                indexFilePath,
                JSON.stringify({ ...indexObj, ...updatedIndexObj })
            );

            return newEntry;
        }
    }

    console.log(`${red("Couldn't find index.json, starting indexing...")}`);
    const algorithmsDir = join(__dirname, '..', '..', 'algorithms');
    const indexObj = indexer(algorithmsDir);

    if (!(algorithm in indexObj))
        throw new Error('Algorithm not present');

    writeFileSync(indexFilePath, JSON.stringify(indexObj));

    return indexObj[algorithm];
}

export { ensureIndexes, indexer };