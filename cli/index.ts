import { join } from 'path';
import { program } from 'commander';

import { indexer, showStats } from './utils'


// Command setup
program
    .command('index')
    .alias('i')
    .option('-s, --stats', 'Show index stats')
    .description('Starts indexing algorithms directory')
    .action(opts => {
        const algorithmsDir = join(__dirname, '..', 'algorithms', 'strings');
        const indexObj = indexer(algorithmsDir);

        console.log('Indexing complete');

        if (opts.stats)
            showStats(indexObj);
    });

program
    .version('1.0.0')
    .parse(process.argv);