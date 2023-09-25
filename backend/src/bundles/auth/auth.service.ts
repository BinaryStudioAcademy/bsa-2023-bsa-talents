import {
    type UserFindResponseDto,
    type UserForgotPasswordRequestDto,
    type UserResetPasswordRequestDto,
    type UserSignInRequestDto,
    type UserSignInResponseDto,
    type UserSignUpRequestDto,
    type UserSignUpResponseDto,
} from '~/bundles/users/types/types.js';
import { type UserService } from '~/bundles/users/user.service.js';
import { ErrorMessage } from '~/common/enums/enums.js';
import { HttpCode, HttpError } from '~/common/http/http.js';
import { type Encrypt } from '~/common/packages/encrypt/encrypt.js';
import { token } from '~/common/packages/packages.js';

import { TOKEN_EXPIRY } from './constants/constants.js';

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
                message: ErrorMessage.EMAIL_ALREADY_EXISTS,
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
                message: ErrorMessage.INCORRECT_EMAIL,
                status: HttpCode.NOT_FOUND,
            });
        }

        const isEqualPassword = await this.encrypt.compare(
            password,
            user.toNewObject().passwordHash,
        );

        if (!isEqualPassword) {
            throw new HttpError({
                message: ErrorMessage.PASSWORDS_NOT_MATCH,
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
                message: ErrorMessage.USER_NOT_FOUND,
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
                message: ErrorMessage.USER_NOT_FOUND,
            });
        }

        const resetToken = await token.create({ id: user.id });

        const hash = await this.encrypt.make(resetToken);

        const resetTokenExpiry = Date.now() + TOKEN_EXPIRY;

        await this.userService.updateResetToken({
            userId: user.id,
            resetToken: hash,
            resetTokenExpiry,
        });

        const encodedResetToken = Buffer.from(resetToken).toString('base64');

        return encodedResetToken.replaceAll('+', '-').replaceAll('/', '_');
    }

    public async forgotPassword({
        resetToken,
        password,
    }: UserResetPasswordRequestDto): Promise<void> {
        const user = await this.userService.findByToken(resetToken);

        if (
            !user?.resetToken ||
            !user.resetTokenExpiry ||
            Date.now() > user.resetTokenExpiry
        ) {
            throw new HttpError({
                status: HttpCode.BAD_REQUEST,
                message: ErrorMessage.TOKEN_INVALID_OR_EXPIRED,
            });
        }

        const isEqualToken = await this.encrypt.compare(
            resetToken,
            user.resetToken,
        );

        if (isEqualToken) {
            const passwordHash = await this.encrypt.make(password);

            await this.userService.updateResetToken({
                userId: user.id,
                resetToken: null,
                resetTokenExpiry: null,
                passwordHash,
            });
        }
    }
}

export { AuthService };
