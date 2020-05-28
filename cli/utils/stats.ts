import { cyanBright, green, magenta, yellow } from 'colorette';

import { IndexEntryMap } from "../types";


const showStats = (indexObj: IndexEntryMap) => {
    console.log('\n=====  STATS  =====\n');

    let totalFiles = 0;
    let totalSize = 0;
    let statMsg = '';

    for (const entry of Object.keys(indexObj).sort()) {
        const entryObj = indexObj[entry];
        const size = entryObj.files
            .map(f => f.size)
            .reduce((a, b) => a + b) / 1000;

        totalFiles += entryObj.files.length;
        totalSize += size;

        statMsg += `\nAlgorithm : ${cyanBright(entry)}\n`;
        statMsg += `Topic : ${yellow(entryObj.topic)}\n`;
        statMsg += `File count : ${green(entryObj.files.length.toString())}\n`;
        statMsg += `Size : ${green(size.toPrecision(3) + 'kb')}\n`;
        statMsg += `Languages : ${magenta(entryObj.files.map(e => e.lang).join())}\n`;
    }

    console.log(`Total files : ${green(totalFiles.toString())}, Total size : ${green(totalSize.toPrecision(3) + 'kb')}`);
    console.log(statMsg);
}

export { showStats };