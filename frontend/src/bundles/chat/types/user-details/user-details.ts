import { type DataStatus } from '~/bundles/common/enums/enums.js';
import {
    type UserDetailsUpdateRequestDto,
    type ValueOf,
} from '~/bundles/search-candidates/types/types.js';

type UserDetails = UserDetailsUpdateRequestDto & {
    photo?: File | null;
    cv?: File | null;
    dataStatus?: ValueOf<typeof DataStatus>;
    createdAt?: string;
};

export { type UserDetails };
