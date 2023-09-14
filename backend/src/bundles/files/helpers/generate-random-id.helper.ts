const RADIX = 36;
const ONE = 1;

const generateRandomId = (fileName: string): string => {
    const parts = fileName.split('.');
    const extension = parts[parts.length - ONE];

    const randomId = Math.random().toString(RADIX).replace('0.', 'file_');
    return `${randomId}.${extension}`;
};

export { generateRandomId };
