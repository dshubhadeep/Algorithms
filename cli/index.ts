import { join } from 'path';
import { writeFileSync } from 'fs';
import { program } from 'commander';

import { executor } from './executor';
import { indexer, showStats } from './utils';


// Command setup
program
    .command('index')
    .alias('i')
    .option('-s, --stats', 'Show index stats')
    .description('Starts indexing algorithms directory')
    .action(opts => {
        const algorithmsDir = join(__dirname, '..', 'algorithms');
        const indexObj = indexer(algorithmsDir);
        // Write to index.json
        writeFileSync(join(__dirname, 'index.json'), JSON.stringify(indexObj));

        console.log('Indexing complete');

        if (opts.stats)
            showStats(indexObj);
    });

program
    .command('exec <algorithm> [lang]')
    .alias('e')
    .description('Execute a specific algorithm in languages that are provided, if not specified will run for all languages.')
    .action((algorithm, lang) => {
        console.log(`Algorithm : ${algorithm}`);
        console.log(`Lang : ${lang}`);
        executor(algorithm, lang);
    });

program
    .version('1.0.0')
    .parse(process.argv);