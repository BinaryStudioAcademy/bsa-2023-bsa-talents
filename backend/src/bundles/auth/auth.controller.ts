import {
    type UserForgotPasswordRequestDto,
    type UserResetPasswordRequestDto,
    type UserSignInRequestDto,
    type UserSignUpRequestDto,
} from '~/bundles/users/users.js';
import {
    userForgotPasswordValidationSchema,
    userResetPasswordValidationSchema,
    userSignInValidationSchema,
    userSignUpValidationSchema,
} from '~/bundles/users/users.js';
import { ApiPath, NotificationMessages } from '~/common/enums/enums.js';
import { HttpCode } from '~/common/http/http.js';
import {
    type ApiHandlerOptions,
    type ApiHandlerResponse,
} from '~/common/packages/controller/controller.js';
import { type Logger } from '~/common/packages/logger/logger.js';
import { ControllerBase } from '~/common/packages/packages.js';

import { type EmailService } from '../email/email.js';
import { type AuthService } from './auth.service.js';
import { AuthApiPath } from './enums/enums.js';

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */
class AuthController extends ControllerBase {
    private authService: AuthService;
    private emailService: EmailService;

    public constructor(
        logger: Logger,
        authService: AuthService,
        emailService: EmailService,
    ) {
        super(logger, ApiPath.AUTH);

        this.authService = authService;
        this.emailService = emailService;

        this.addRoute({
            path: AuthApiPath.SIGN_UP,
            method: 'POST',
            validation: {
                body: userSignUpValidationSchema,
            },
            handler: (options) =>
                this.signUp(
                    options as ApiHandlerOptions<{
                        body: UserSignUpRequestDto;
                    }>,
                ),
        });

        this.addRoute({
            path: AuthApiPath.SIGN_IN,
            method: 'POST',
            validation: {
                body: userSignInValidationSchema,
            },
            handler: (options) =>
                this.signIn(
                    options as ApiHandlerOptions<{
                        body: UserSignInRequestDto;
                    }>,
                ),
        });

        this.addRoute({
            path: AuthApiPath.CURRENT_USER,
            method: 'GET',
            handler: (options) => this.getCurrentUser(options),
        });

        this.addRoute({
            path: AuthApiPath.FORGOT_PASSWORD,
            method: 'POST',
            validation: {
                body: userForgotPasswordValidationSchema,
            },
            handler: (options) =>
                this.forgotPassword(
                    options as ApiHandlerOptions<{
                        body: UserForgotPasswordRequestDto;
                    }>,
                ),
        });

        this.addRoute({
            path: AuthApiPath.RESET_PASSWORD,
            method: 'POST',
            validation: {
                body: userResetPasswordValidationSchema,
            },
            handler: (options) =>
                this.resetPassword(
                    options as ApiHandlerOptions<{
                        body: UserResetPasswordRequestDto;
                    }>,
                ),
        });
    }

    /**
     * @swagger
     * /auth/sign-up:
     *    post:
     *      tags: [Auth]
     *      description: Sign up user into the system
     *      requestBody:
     *        description: User auth data
     *        required: true
     *        content:
     *          application/json:
     *            schema:
     *              type: object
     *              properties:
     *                email:
     *                  type: string
     *                  format: email
     *                password:
     *                  type: string
     *                role:
     *                  $ref: '#/components/schemas/RoleEnum'
     *      responses:
     *        201:
     *          description: Successful operation
     *          content:
     *            application/json:
     *              schema:
     *                type: object
     *                properties:
     *                  id:
     *                    type: string
     *                    format: uuid
     *                  email:
     *                    type: string
     *                    format: email
     *                  role:
     *                    $ref: '#/components/schemas/RoleEnum'
     *                  token:
     *                    type: string
     */
    private async signUp(
        options: ApiHandlerOptions<{
            body: UserSignUpRequestDto;
        }>,
    ): Promise<ApiHandlerResponse> {
        return {
            status: HttpCode.CREATED,
            payload: await this.authService.signUp(options.body),
        };
    }
    /**
     * @swagger
     * /auth/sign-in:
     *    post:
     *      tags: [Auth]
     *      description: Sign in user into the system
     *      requestBody:
     *        description: User auth data
     *        required: true
     *        content:
     *          application/json:
     *            schema:
     *              type: object
     *              properties:
     *                email:
     *                  type: string
     *                  format: email
     *                password:
     *                  type: string
     *      responses:
     *        201:
     *          description: Successful operation
     *          content:
     *            application/json:
     *              schema:
     *                type: object
     *                properties:
     *                  id:
     *                    type: string
     *                    format: uuid
     *                  email:
     *                    type: string
     *                    format: email
     *                  role:
     *                    $ref: '#/components/schemas/RoleEnum'
     *                  token:
     *                    type: string
     */
    private async signIn(
        options: ApiHandlerOptions<{
            body: UserSignInRequestDto;
        }>,
    ): Promise<ApiHandlerResponse> {
        return {
            status: HttpCode.OK,
            payload: await this.authService.signIn(options.body),
        };
    }

    /**
     * @swagger
     * /auth/current-user:
     *   get:
     *     tags:
     *       - Auth
     *     description: Get the current user based on the provided token
     *     security:
     *       - bearerAuth: []
     *     responses:
     *       200:
     *         description: Successful operation
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/User'
     */

    private async getCurrentUser(
        options: ApiHandlerOptions,
    ): Promise<ApiHandlerResponse> {
        const [, token] = options.headers.authorization?.split(' ') ?? [];

        const user = await this.authService.getCurrentUser(token);

        return {
            status: HttpCode.OK,
            payload: user,
        };
    }

    private async forgotPassword(
        options: ApiHandlerOptions<{ body: UserForgotPasswordRequestDto }>,
    ): Promise<ApiHandlerResponse> {
        const resetToken = await this.authService.createResetToken(
            options.body,
        );

        await this.emailService.sendForgotPasswordEmail(
            options.body.email,
            resetToken,
        );

        return {
            status: HttpCode.OK,
            payload: {
                message: NotificationMessages.PASSWORD_RESET_LINK_SENT_BY_EMAIL,
            },
        };
    }

    private async resetPassword(
        options: ApiHandlerOptions<{ body: UserResetPasswordRequestDto }>,
    ): Promise<ApiHandlerResponse> {
        await this.authService.forgotPassword(options.body);

        return {
            status: HttpCode.OK,
            payload: { message: NotificationMessages.PASSWORD_HAS_BEEN_RESET },
        };
    }
}

export { AuthController };
