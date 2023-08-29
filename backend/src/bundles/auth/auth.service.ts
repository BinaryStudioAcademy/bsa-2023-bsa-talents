import {
    type UserFindResponseDto,
    type UserSignInRequestDto,
    type UserSignInResponseDto,
    type UserSignUpRequestDto,
    type UserSignUpResponseDto,
} from '~/bundles/users/types/types.js';
import { type UserService } from '~/bundles/users/user.service.js';
import { type Encrypt } from '~/common/encrypt/encrypt.package.js';
import { ErrorMessages } from '~/common/enums/enums.js';
import { HttpCode, HttpError } from '~/common/http/http.js';
import { tokenService } from '~/common/services/services.js';

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
        const token = await tokenService.create({ id: user.id });

        return {
            ...user,
            token,
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
        const token = await tokenService.create({ id: user.id });

        return {
            ...user,
            token,
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
            user.toObject().passwordHash,
        );

        if (!isEqualPassword) {
            throw new HttpError({
                message: ErrorMessages.PASSWORDS_NOT_MATCH,
                status: HttpCode.UNAUTHORIZED,
            });
        }

        return user.toObject();
    }
}

export { AuthService };
