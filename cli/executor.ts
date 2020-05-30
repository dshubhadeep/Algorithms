import { ensureIndexes } from './utils';

const executor = (algorithm: string, lang: string[]) => {
    const entry = ensureIndexes(algorithm);
    console.log(entry);
};

export { executor };
