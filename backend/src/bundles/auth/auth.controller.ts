import { type UserSignUpRequestDto } from '~/bundles/users/users.js';
import { userSignUpValidationSchema } from '~/bundles/users/users.js';
import {
    type ApiHandlerOptions,
    type ApiHandlerResponse,
    ControllerBase,
} from '~/common/controller/controller.js';
import { ApiPath } from '~/common/enums/enums.js';
import { HttpCode, HttpError } from '~/common/http/http.js';
import { type Logger } from '~/common/logger/logger.js';

import { type AuthService } from './auth.service.js';
import { AuthApiPath } from './enums/enums.js';

class AuthController extends ControllerBase {
    private authService: AuthService;

    public constructor(logger: Logger, authService: AuthService) {
        super(logger, ApiPath.AUTH);

        this.authService = authService;

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
            path: AuthApiPath.CURRENT_USER,
            method: 'GET',
            handler: (options) => this.getCurrentUser(options),
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
     *      responses:
     *        201:
     *          description: Successful operation
     *          content:
     *            application/json:
     *              schema:
     *                type: object
     *                properties:
     *                  message:
     *                    type: object
     *                    $ref: '#/components/schemas/User'
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
     * /auth/current-user:
     *   get:
     *     tags:
     *       - Auth
     *     description: Get the current user based on the provided token
     *     security:
     *       - BearerAuth: []
     *     responses:
     *       200:
     *         description: Successful operation
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/User'
     *       401:
     *         description: Unauthorized
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Error'
     *       404:
     *         description: User not found
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Error'
     */

    private async getCurrentUser(
        options: ApiHandlerOptions,
    ): Promise<ApiHandlerResponse> {
        const [, token] = options.headers.authorization?.split(' ') ?? [];

        if (!token) {
            throw new HttpError({
                status: HttpCode.UNAUTHORIZED,
                message: 'Authorization token is missing',
            });
        }

        try {
            const user = await this.authService.findByToken(token);

            return {
                status: HttpCode.OK,
                payload: user,
            };
        } catch (error) {
            throw new HttpError({
                status: HttpCode.NOT_FOUND,
                message: 'No user found for provided token',
                cause: error,
            });
        }
    }
}

export { AuthController };
