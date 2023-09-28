const RADIX = 36;

const generateRandomId = (fileName: string): string => {
    const [extension, name] = fileName.split('.').reverse();

    const randomId = Math.random().toString(RADIX).replace('0.', `${name}_`);
    return `${randomId}.${extension}`;
};

export { generateRandomId };
