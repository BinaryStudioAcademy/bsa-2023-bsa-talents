import { userService } from '~/bundles/users/users.js';
import { encrypt, logger } from '~/common/packages/packages.js';

import { EmailService } from '../email/email.js';
import { AuthController } from './auth.controller.js';
import { AuthService } from './auth.service.js';

const emailService = new EmailService();
const authService = new AuthService(userService, encrypt);
const authController = new AuthController(logger, authService, emailService);

export { authController, authService };
