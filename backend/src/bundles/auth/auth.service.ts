import {
    type UserFindResponseDto,
    type UserSignInRequestDto,
    type UserSignInResponseDto,
    type UserSignUpRequestDto,
    type UserSignUpResponseDto,
} from '~/bundles/users/types/types.js';
import { type UserService } from '~/bundles/users/user.service.js';
import { ErrorMessages } from '~/common/enums/enums.js';
import { HttpCode, HttpError } from '~/common/http/http.js';
import { token } from '~/common/packages/packages.js';

class AuthService {
    private userService: UserService;

    public constructor(userService: UserService) {
        this.userService = userService;
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

        const isEqualPassword = password === 'HASH'; // Replace with cryptCompare from bt-86

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
