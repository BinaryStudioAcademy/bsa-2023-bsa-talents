const RADIX = 36;

const generateRandomId = (fileName: string): string => {
    const [extension] = fileName.split('.').reverse();

    const randomId = Math.random().toString(RADIX).replace('0.', 'file_');
    return `${randomId}.${extension}`;
};

export { generateRandomId };
