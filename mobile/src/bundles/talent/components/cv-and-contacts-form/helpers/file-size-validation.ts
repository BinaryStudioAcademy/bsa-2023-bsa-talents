import { MAX_FILE_SIZE } from '../constants/constants';

const fileSizeValidation = (size: number): string => {
    if (size > MAX_FILE_SIZE.bytes) {
        return `Allowed image file is < ${MAX_FILE_SIZE.mb}mb`;
    }
    return '';
};

export { fileSizeValidation };
