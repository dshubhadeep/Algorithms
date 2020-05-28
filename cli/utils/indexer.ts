import { statSync, writeFileSync } from 'fs';
import { join, parse, sep } from 'path';

import { walker } from './walker';
import { extensionMap } from '../constants';
import { convertPascalToSnakeCase, convertSnakeToCapitalized } from './strings';
import { IndexEntryMap, IndexFileEntry } from '../types';


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

    writeFileSync(join(__dirname, 'index.json'), JSON.stringify(obj), 'utf-8');

    return obj;
}

export { indexer };