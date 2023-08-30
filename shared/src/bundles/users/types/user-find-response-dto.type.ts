import { type ValueOf } from '~/types/value-of.type.js';

import { type UserRole } from '../enums/enums.js';

type UserFindResponseDto = {
    id: string;
    email: string;
    role: ValueOf<typeof UserRole>;
};

export { type UserFindResponseDto };
