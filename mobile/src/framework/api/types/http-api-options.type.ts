import { type ContentType } from '~/bundles/common/enums/enums';
import { type ValueOf } from '~/bundles/common/types/types';
import { type HttpOptions } from '~/framework/http/http';

type HttpApiOptions = Omit<HttpOptions, 'headers' | 'payload'> & {
    hasAuth: boolean;
    contentType: ValueOf<typeof ContentType>;
    payload?: HttpOptions['payload'];
};

export { type HttpApiOptions };
