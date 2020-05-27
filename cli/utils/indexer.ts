import { statSync, writeFileSync } from 'fs';
import { join, parse } from 'path';

import { extensionMap } from '../constants';
import { IndexEntryMap, IndexFileEntry } from '../types';


/**
 * Will convert pascal case i.e FileName to snake case i.e. file_name
 * @param fileName 
 */
const convertPascalToSnakeCase = (fileName: string) => {
    let newFileName = '';
    newFileName += fileName[0].toLowerCase();

    for (let i = 1; i < fileName.length; i++) {
        newFileName += fileName[i] === fileName[i].toLowerCase()
            ? fileName[i]
            : "_" + fileName[i].toLowerCase();
    }

    return newFileName;
}

/**
 * Simple function that will map file name to relevant language files
 * Can be used to get stats for each algorithm like language, file size
 * @param filesList Files that needed to be indexed
 */
const indexer = (filesList: string[]) => {
    const obj: IndexEntryMap = {};

    filesList
        .filter(f => !f.endsWith(".md")) // only index language files
        .forEach(file => {
            const { ext, name, dir, base } = parse(file);
            const { size } = statSync(file);
            const newName = convertPascalToSnakeCase(name);

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

    writeFileSync(join(__dirname, 'index.json'), JSON.stringify(obj), 'utf-8');

    return obj;
}

export { indexer };
