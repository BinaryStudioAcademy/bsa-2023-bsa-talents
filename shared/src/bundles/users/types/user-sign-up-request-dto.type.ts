import { type ValueOf } from '~/types/value-of.type.js';

import { type UserRole } from '../enums/enums.js';

type UserSignUpRequestDto = {
    email: string;
    password: string;
    role: ValueOf<typeof UserRole>;
};

export { type UserSignUpRequestDto };
