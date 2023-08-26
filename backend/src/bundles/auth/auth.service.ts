import {
    type UserFindResponseDto,
    type UserSignInRequestDto,
    type UserSignInResponseDto,
    type UserSignUpRequestDto,
    type UserSignUpResponseDto,
} from '~/bundles/users/types/types.js';
import { type UserService } from '~/bundles/users/user.service.js';
import { cryptCompare } from '~/common/helpers/helpers.js';
import { HttpCode, HttpError } from '~/common/http/http.js';
import { tokenService } from '~/common/services/services.js';

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
            token: await tokenService.create({ id: user.id }),
        };
    }

    public async signUp(
        userRequestDto: UserSignUpRequestDto,
    ): Promise<UserSignUpResponseDto> {
        const { email } = userRequestDto;

        const userByEmail = await this.userService.findByEmail(email);
        if (userByEmail) {
            throw new HttpError({
                message: 'User already exist.',
                cause: 'Email already used',
                status: HttpCode.CONFLICT,
            });
        }

        const user = await this.userService.create(userRequestDto);
        return {
            token: await tokenService.create({ id: user.id }),
        };
    }

    public async verifyLoginCredentials({
        email,
        password,
    }: UserSignInRequestDto): Promise<UserFindResponseDto> {
        const user = await this.userService.findByEmail(email);

        if (!user) {
            throw new HttpError({
                message: 'User not found',
                cause: 'User with the given email does not exist',
                status: HttpCode.NOT_FOUND,
            });
        }

        const isEqualPassword = await cryptCompare(password, user.passwordHash);

        if (!isEqualPassword) {
            throw new HttpError({
                message: 'Unauthorized',
                cause: 'Invalid credentials',
                status: HttpCode.UNAUTHORIZED,
            });
        }

        return user;
    }
}

export { AuthService };
