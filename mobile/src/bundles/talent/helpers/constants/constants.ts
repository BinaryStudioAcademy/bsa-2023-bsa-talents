const ACCEPTED_PHOTO_TYPES = ['jpeg', 'png', 'jpg'];
const MAX_FILE_SIZE = {
    'mb': 5,
    'bytes': 5_242_880,
};

const ERROR_MESSAGE = {
    'SIZE': `Please upload smaller than ${MAX_FILE_SIZE.mb} MB.`,
    'IMAGE_TYPE': `Allowed image file could be only ${ACCEPTED_PHOTO_TYPES.join(
        ', ',
    )}`,
};

export { ACCEPTED_PHOTO_TYPES, ERROR_MESSAGE, MAX_FILE_SIZE };
