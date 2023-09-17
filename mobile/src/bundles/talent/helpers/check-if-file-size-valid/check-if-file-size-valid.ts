import { MAX_FILE_SIZE } from '../constants/constants';

const checkIfFileSizeValid = (fileSize: number | undefined | null): boolean => {
    return Boolean(fileSize && fileSize < MAX_FILE_SIZE.bytes);
};

export { checkIfFileSizeValid };
