import { ErrorMessages } from '~/bundles/common/enums/enums';

const getErrorMessage = (error: unknown): string => {
    if (error instanceof Error) {
        return error.message;
    }
    return ErrorMessages.UNKNOWN_ERROR;
};

export { getErrorMessage };
