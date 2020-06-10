const { join, sep, parse } = require('path');
const { copyFileSync, ensureDirSync, existsSync, emptyDirSync, readdirSync, readFileSync, statSync, writeFileSync } = require('fs-extra');

const ALGORITHMS_DIR = join(__dirname, '..', 'algorithms');
const SITE_DIR = join(__dirname, "..", "site");

const isDir = fPath => statSync(fPath).isDirectory();
const isFile = fPath => statSync(fPath).isFile();

const walk = dirPath => {
    const filesList = [];
    helper(dirPath, filesList);
    return filesList;
}

const helper = (dirPath, filesList) => {
    const contents = readdirSync(dirPath);

    for (const content of contents) {
        const contentPath = join(dirPath, content);

        if (isFile(contentPath))
            filesList.push(contentPath);
        else if (isDir(contentPath))
            helper(contentPath, filesList);
    }
}

const groupByTopic = filePaths => {
    const obj = {};
    for (const path of filePaths) {
        const topic = path[0];
        if (topic in obj) {
            obj[topic].push(join(ALGORITHMS_DIR, topic, ...path.slice(1)));
        } else {
            obj[topic] = [join(ALGORITHMS_DIR, topic, ...path.slice(1))];
        }
    }
    return obj;
}

const capitalize = s => s[0].toUpperCase() + s.slice(1);
const convertSnakeToCapitalized = str => str.split("_").map(capitalize).join(" ");

const extensionMap = {
    ".java": "java",
    ".cpp": "c++",
    ".rs": "rust",
    ".py": "python",
    ".go": "go",
    ".ts": "typescript"
}

const convertPascalToSnakeCase = fileName => {
    let newFileName = '';
    newFileName += fileName[0].toLowerCase();

    for (let i = 1; i < fileName.length; i++) {
        newFileName += fileName[i] === fileName[i].toLowerCase()
            ? fileName[i]
            : "_" + fileName[i].toLowerCase();
    }

    return newFileName;
}

const generateReadme = (newPath, filePath) => {
    const { name, ext } = parse(filePath);
    const newFileName = convertPascalToSnakeCase(name) + ".md";

    const splitLength = ALGORITHMS_DIR.split(sep).length;
    const splitPaths = filePath.split(sep).slice(splitLength);

    let title = splitPaths[splitPaths.length - 2].split("_").map(capitalize).join(" ");

    const mdFilePath = join(newPath, newFileName);

    let mdData = existsSync(mdFilePath)
        ? readFileSync(mdFilePath, 'utf8')
        : `# ${title}`;

    const fileData = readFileSync(filePath, 'utf8');

    mdData += `\n\n## ${capitalize(extensionMap[ext])}\n`;
    if (ext === ".cpp")
        mdData += "\n```cpp" + "\n" + fileData + "\n```";
    else
        mdData += "\n```" + extensionMap[ext] + "\n" + fileData + "\n```";

    // write file
    writeFileSync(mdFilePath, mdData);
}

const filePaths = walk(ALGORITHMS_DIR);

const splitPathLength = ALGORITHMS_DIR.split(sep).length;
const splitPaths = filePaths.map(p => p.split(sep).slice(splitPathLength));
const groupedPaths = groupByTopic(splitPaths);

for (const topic in groupedPaths) {
    const topicPath = join(__dirname, '..', 'site', topic);
    ensureDirSync(topicPath);
    emptyDirSync(topicPath);
    const filePaths = groupedPaths[topic];

    filePaths.forEach(filePath => {
        if (!filePath.endsWith('README.md')) {
            generateReadme(topicPath, filePath);
        } else {
            // copyFileSync(filePath, join(topicPath, 'README.md'))
        }
    });
}

// Copy main readme to site dir.
copyFileSync(join(__dirname, '..', 'README.md'), join(SITE_DIR, 'README.md'));

// Generate vuepress config file
const siteDirs = readdirSync(SITE_DIR);
const sidebar = [];

for (const dir of siteDirs) {
    const dirPath = join(SITE_DIR, dir)
    if (!dir.startsWith('.') && isDir(dirPath)) {
        const obj = {};
        const files = readdirSync(dirPath);

        obj.title = convertSnakeToCapitalized(dir);
        obj.children = files.map(file => `${dir}/${file.slice(0, file.indexOf('.'))}`)

        sidebar.push(obj);
    }
}

const configOpts = {
    markdown: {
        lineNumbers: true
    },
    themeConfig: {
        smoothScroll: true,
        nav: [
            { text: 'Home', link: '/' },
            { text: 'Github', link: 'https://github.com/dshubhadeep/Algorithms' }
        ],
        sidebar
    }
}

console.log(configOpts);

writeFileSync(
    join(SITE_DIR, '.vuepress', 'config.js'),
    `module.exports=${JSON.stringify(configOpts, null, 2)}`
);