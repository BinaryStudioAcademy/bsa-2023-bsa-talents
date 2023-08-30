import { userService } from '~/bundles/users/users.js';
import { logger } from '~/common/packages/packages.js';

import { AuthController } from './auth.controller.js';
import { AuthService } from './auth.service.js';

const authService = new AuthService(userService);
const authController = new AuthController(logger, authService);

export { authController, authService };
