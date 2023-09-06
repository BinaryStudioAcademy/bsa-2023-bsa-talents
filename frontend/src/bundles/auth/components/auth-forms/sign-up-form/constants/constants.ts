import { UserRole } from 'shared/build/index.js';

import { type UserSignUpRequestDto } from '~/bundles/users/users.js';

const DEFAULT_SIGN_UP_PAYLOAD: UserSignUpRequestDto = {
    email: '',
    role: UserRole.TALENT,
    password: '',
};

export { DEFAULT_SIGN_UP_PAYLOAD };
