import { type UserSignInRequestDto } from 'shared/build/bundles/users/types/user-sign-in-request-dto.type';

type UserSignInForm = {
    isRememberMeChecked: boolean;
} & UserSignInRequestDto;

export { type UserSignInForm };
