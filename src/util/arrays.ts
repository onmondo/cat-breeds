export function uniqById<T extends { id: string }>(
    firstArray: T[], 
    secondArray: T[]
) {
    // Combine arrays
    let combinedArray = firstArray.concat(secondArray);

    // Create a Map to store unique items based on id
    let idMap = new Map();

    combinedArray.forEach((item) => {
        idMap.set(item?.id, item);
    });

    // Convert Map values back to an array
    let uniqueArray = Array.from(idMap.values());

    return uniqueArray
}