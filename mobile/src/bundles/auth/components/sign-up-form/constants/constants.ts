import { type UserSignUpRequestDto } from '~/bundles/auth/types/types';
import { UserRole } from '~/bundles/users/enums/enums';

const USER_SIGN_UP_DEFAULT_VALUES: UserSignUpRequestDto = {
    email: '',
    role: UserRole.TALENT,
    password: '',
};

export { USER_SIGN_UP_DEFAULT_VALUES };
