import { config } from '~/common/config/config.js';
import { logger } from '~/common/logger/logger.js';

import { UserController } from './user.controller.js';
import { UserModel } from './user.model.js';
import { UserRepository } from './user.repository.js';
import { UserService } from './user.service.js';

const { PASSWORD_SALT_ROUNDS } = config.ENV.CRYPT;

const userRepository = new UserRepository(UserModel);
const userService = new UserService(userRepository, PASSWORD_SALT_ROUNDS);
const userController = new UserController(logger, userService);

export { userController, userRepository, userService };
export {
    type UserSignInRequestDto,
    type UserSignUpRequestDto,
    type UserSignUpResponseDto,
} from './types/types.js';
export { UserModel } from './user.model.js';
export {
    userSignInValidationSchema,
    userSignUpValidationSchema,
} from './validation-schemas/validation-schemas.js';
