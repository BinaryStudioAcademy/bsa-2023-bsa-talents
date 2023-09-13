import crypto from 'node:crypto';

const FIRST_RANDOM_NUMBER = 3;
const SECOND_RANDOM_NUMBER = 4;

const getUniqueName = (fileName: string): string =>
    `${fileName}-${crypto
        .randomBytes(FIRST_RANDOM_NUMBER * SECOND_RANDOM_NUMBER)
        .toString('base64')}`;

export { getUniqueName };
