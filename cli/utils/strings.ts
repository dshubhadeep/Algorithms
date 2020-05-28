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

const capitalize = (str: string) => str[0].toUpperCase() + str.slice(1);

/**
 * Will convert snake case `hello_world` to `Hello World`
 * @param str 
 */
const convertSnakeToCapitalized = (str: string) => str.split("_").map(capitalize).join(" ");

export { convertPascalToSnakeCase, convertSnakeToCapitalized };