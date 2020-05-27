import path from 'path';
import { program } from 'commander';

import { indexer, showStats, walker } from './utils'


// Command setup
program
    .command('index')
    .alias('i')
    .option('-s, --stats', 'Show index stats')
    .description('Starts indexing algorithms directory')
    .action(opts => {
        const algorithmsDir = path.join(__dirname, '..', 'algorithms');
        const filesList = walker(algorithmsDir);
        const indexObj = indexer(filesList);

        console.log('Indexing complete');

        if (opts.stats)
            showStats(indexObj);
    });

program
    .version('1.0.0')
    .parse(process.argv);