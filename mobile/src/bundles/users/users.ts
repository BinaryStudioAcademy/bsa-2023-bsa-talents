import { config } from '~/framework/config/config';
import { http } from '~/framework/http/http';
import { storage } from '~/framework/storage/storage';

import { UserApi } from './users-api';

const userApi = new UserApi({
    baseUrl: config.ENV.API.ORIGIN_URL,
    storage,
    http,
});

export { userApi };
export {
    type UserGetAllItemResponseDto,
    type UserGetAllResponseDto,
    type UserSignInRequestDto,
    type UserSignInResponseDto,
    type UserSignUpRequestDto,
    type UserSignUpResponseDto,
} from './types/types';
export {
    userSignInValidationSchema,
    userSignUpValidationSchema,
} from './validation-schemas/validation-schemas';
