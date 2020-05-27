import { readdirSync, statSync } from 'fs';
import { join } from 'path';

const isDir = (fPath: string) => statSync(fPath).isDirectory();
const isFile = (fPath: string) => statSync(fPath).isFile();

/**
 * Will recursively fetch the path of all files in a given directory
 * @param dirPath Directory path
 */
const walker = (dirPath: string) => {
    const filesList: string[] = [];
    helper(dirPath, filesList);
    return filesList;
}

const helper = (dirPath: string, filesList: string[]) => {
    const contents = readdirSync(dirPath);

    for (const content of contents) {
        const contentPath = join(dirPath, content);

        if (isFile(contentPath))
            filesList.push(contentPath);
        else if (isDir(contentPath))
            helper(contentPath, filesList);
    }
}

export { walker };
