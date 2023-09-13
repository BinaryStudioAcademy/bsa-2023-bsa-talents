import { type HttpCode } from '~/bundles/common/enums/enums.js';
import { type ValueOf } from '~/bundles/common/types/types.js';

type FileApiHandlerResponse = {
    status: ValueOf<typeof HttpCode>;
    payload: string;
};

export { type FileApiHandlerResponse };
