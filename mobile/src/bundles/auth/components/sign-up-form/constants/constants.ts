import { UserRole } from '~/bundles/auth/enums/enums';
import { type UserSignUpRequestDto } from '~/bundles/auth/types/types';

const USER_SIGN_UP_DEFAULT_VALUES: UserSignUpRequestDto = {
    email: '',
    role: UserRole.TALENT,
    password: '',
};

export { USER_SIGN_UP_DEFAULT_VALUES };
