import { type UserSignUpRequestDto } from '~/bundles/users/users.js';

const DEFAULT_SIGN_UP_PAYLOAD: UserSignUpRequestDto = {
    email: '',
    role: '',
    password: '',
};

export { DEFAULT_SIGN_UP_PAYLOAD };