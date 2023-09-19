import { type ValueOf } from 'shared/build/types/value-of.type';

import { type PhotoType } from '~/bundles/common/enums/ui/ui';

type PhotoProperties = {
    avatarSize?: ValueOf<typeof PhotoType>;
    fullName?: string;
    uri?: string;
};

export { type PhotoProperties };
