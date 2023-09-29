import { config } from '~/framework/config/config.js';
import { http } from '~/framework/http/http.js';
import { storage } from '~/framework/storage/storage.js';

import { UsersApi } from './users-api.js';

const usersApi = new UsersApi({
    baseUrl: config.ENV.API.ORIGIN_URL,
    storage,
    http,
});

export { usersApi };
export { UserRole } from './enums/enums.js';
export {
    type UserFindResponseDto,
    type UserForgotPasswordRequestDto,
    type UserForgotPasswordResponseDto,
    type UserGetAllItemResponseDto,
    type UserGetAllResponseDto,
    type UserResetPasswordDto,
    type UserResetPasswordRequestDto,
    type UserResetPasswordResponseDto,
    type UserSignInRequestDto,
    type UserSignInResponseDto,
    type UserSignUpRequestDto,
    type UserSignUpResponseDto,
} from './types/types.js';
export {
    userForgotPasswordValidationSchema,
    userPasswordValidationSchema,
    userResetPasswordValidationSchema,
    userSignInValidationSchema,
    userSignUpValidationSchema,
} from './validation-schemas/validation-schemas.js';
