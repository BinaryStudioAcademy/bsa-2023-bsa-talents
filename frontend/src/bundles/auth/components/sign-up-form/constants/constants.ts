import { type UserSignUpRequestDto } from '~/bundles/users/users.js';

const DEFAULT_SIGN_UP_PAYLOAD: UserSignUpRequestDto = {
    email: '',
    password: '',
    role: 'talent',
};

export { DEFAULT_SIGN_UP_PAYLOAD };
