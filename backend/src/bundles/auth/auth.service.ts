import crypto from 'node:crypto';

import {
    type UserFindResponseDto,
    type UserForgotPasswordRequestDto,
    type UserSignInRequestDto,
    type UserSignInResponseDto,
    type UserSignUpRequestDto,
    type UserSignUpResponseDto,
} from '~/bundles/users/types/types.js';
import { type UserService } from '~/bundles/users/user.service.js';
import { ErrorMessages } from '~/common/enums/enums.js';
import { HttpCode, HttpError } from '~/common/http/http.js';
import { type Encrypt } from '~/common/packages/encrypt/encrypt.js';
import { token } from '~/common/packages/packages.js';

import { BITES_SIZE, TOKEN_EXPIRY } from './constants/constants.js';

class AuthService {
    private userService: UserService;
    private encrypt: Encrypt;

    public constructor(userService: UserService, encrypt: Encrypt) {
        this.userService = userService;
        this.encrypt = encrypt;
    }

    public async signIn(
        userRequestDto: UserSignInRequestDto,
    ): Promise<UserSignInResponseDto> {
        const user = await this.verifyLoginCredentials(userRequestDto);

        return {
            ...user,
            token: await token.create({ id: user.id }),
        };
    }

    public async signUp(
        userRequestDto: UserSignUpRequestDto,
    ): Promise<UserSignUpResponseDto> {
        const { email } = userRequestDto;

        const userByEmail = await this.userService.findByEmail(email);

        if (userByEmail) {
            throw new HttpError({
                message: ErrorMessages.EMAIL_ALREADY_EXISTS,
                status: HttpCode.BAD_REQUEST,
            });
        }

        const user = await this.userService.create(userRequestDto);

        return {
            ...user,
            token: await token.create({ id: user.id }),
        };
    }

    public async verifyLoginCredentials({
        email,
        password,
    }: UserSignInRequestDto): Promise<UserFindResponseDto> {
        const user = await this.userService.find({ email });

        if (!user) {
            throw new HttpError({
                message: ErrorMessages.INCORRECT_EMAIL,
                status: HttpCode.NOT_FOUND,
            });
        }

        const isEqualPassword = await this.encrypt.compare(
            password,
            user.toNewObject().passwordHash,
        );

        if (!isEqualPassword) {
            throw new HttpError({
                message: ErrorMessages.PASSWORDS_NOT_MATCH,
                status: HttpCode.UNAUTHORIZED,
            });
        }

        return user.toObject();
    }

    public async getCurrentUser(token: string): Promise<UserFindResponseDto> {
        const user = await this.userService.findByToken(token);

        if (!user) {
            throw new HttpError({
                status: HttpCode.NOT_FOUND,
                message: ErrorMessages.USER_NOT_FOUND,
            });
        }
        return user;
    }

    public async createResetToken({
        email,
    }: UserForgotPasswordRequestDto): Promise<string> {
        const user = await this.userService.findByEmail(email);

        if (!user) {
            throw new HttpError({
                status: HttpCode.NOT_FOUND,
                message: ErrorMessages.USER_NOT_FOUND,
            });
        }

        const resetToken = crypto.randomBytes(BITES_SIZE).toString('hex');

        const hash = await this.encrypt.make(resetToken);

        const resetTokenExpiry = Date.now() + TOKEN_EXPIRY;

        await this.userService.updateResetToken({
            userId: user.id,
            resetToken: hash,
            resetTokenExpiry,
        });

        return resetToken;
    }
}

export { AuthService };
