import { encrypt, logger } from '~/common/packages/packages.js';

import { lmsDataService } from '../lms-data/lms-data.js';
import { UserController } from './user.controller.js';
import { UserModel } from './user.model.js';
import { UserRepository } from './user.repository.js';
import { UserService } from './user.service.js';

const userRepository = new UserRepository(UserModel);
const userService = new UserService(userRepository, encrypt);
const userController = new UserController(logger, userService, lmsDataService);

export { userController, userRepository, userService };
export {
    type UserForgotPasswordRequestDto,
    type UserResetPasswordRequestDto,
    type UserSignInRequestDto,
    type UserSignUpRequestDto,
    type UserSignUpResponseDto,
} from './types/types.js';
export { UserModel } from './user.model.js';
export { UserService } from './user.service.js';
export {
    userForgotPasswordValidationSchema,
    userResetPasswordValidationSchema,
    userSignInValidationSchema,
    userSignUpValidationSchema,
} from './validation-schemas/validation-schemas.js';
