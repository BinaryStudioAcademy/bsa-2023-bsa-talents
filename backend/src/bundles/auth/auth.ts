import { userService } from '~/bundles/users/users.js';
import { encrypt, logger } from '~/common/packages/packages.js';

import { userDetailsService } from '../user-details/user-details.js';
import { AuthController } from './auth.controller.js';
import { AuthService } from './auth.service.js';

const authService = new AuthService(userService, encrypt);
const authController = new AuthController(
    logger,
    authService,
    userDetailsService,
);

export { authController, authService };
