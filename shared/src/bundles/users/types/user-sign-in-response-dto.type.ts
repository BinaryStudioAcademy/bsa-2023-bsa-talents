import { type ValueOf } from '~/types/value-of.type.js';

import { type UserRole } from '../enums/enums.js';

type UserSignInResponseDto = {
    id: string;
    email: string;
    token: string;
    role: ValueOf<typeof UserRole>;
};

export { type UserSignInResponseDto };
