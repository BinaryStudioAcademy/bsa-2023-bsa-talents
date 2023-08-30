import { type ValueOf } from '~/types/value-of.type.js';

import { type UserRole } from '../enums/enums.js';

type UserSignUpResponseDto = {
    id: string;
    email: string;
    role: ValueOf<typeof UserRole>;
    token: string;
};

export { type UserSignUpResponseDto };
