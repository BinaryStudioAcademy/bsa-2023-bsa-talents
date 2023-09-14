import {
    type CustomHelpers,
    type CustomValidator,
    type ErrorReport,
} from 'joi';

const fileSizeValidator = (maxSize: number): CustomValidator<File> => {
    return (value: File, helpers: CustomHelpers<File>): File | ErrorReport => {
        if (value.size <= maxSize) {
            return value;
        }
        return helpers.error('any.invalid');
    };
};

export { fileSizeValidator };
