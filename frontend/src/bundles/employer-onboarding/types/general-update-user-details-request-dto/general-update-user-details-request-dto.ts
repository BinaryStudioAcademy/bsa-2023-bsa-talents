import {
    type UserDetailsUpdateRequestDto,
    type ValueOf,
} from 'shared/build/index.js';

import { type DataStatus } from '~/bundles/common/enums/enums.js';

type UserDetailsGeneralCustom = UserDetailsUpdateRequestDto & {
    photo?: File | null;
    companyLogo?: File | null;
    dataStatus?: ValueOf<typeof DataStatus>;
};

export { type UserDetailsGeneralCustom };
