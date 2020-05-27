export interface IndexEntryMap {
    [key: string]: IndexEntry;
};

export interface IndexEntry {
    dir: string;
    files: IndexFileEntry[];
};

export interface IndexFileEntry {
    base: string;
    ext: string;
    lang: string;
    size: number;
};