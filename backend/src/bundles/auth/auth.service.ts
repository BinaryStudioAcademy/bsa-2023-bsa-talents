import {
    type UserSignInRequestDto,
    type UserSignInResponseDto,
    type UserSignUpRequestDto,
    type UserSignUpResponseDto,
} from '~/bundles/users/types/types.js';
import { type UserRepository } from '~/bundles/users/user.repository.js';
import { type UserService } from '~/bundles/users/user.service.js';
import { cryptCompare } from '~/common/helpers/helpers.js';
import { HttpCode, HttpError } from '~/common/http/http.js';
import { tokenService } from '~/common/services/services.js';

class AuthService {
    private userService: UserService;
    private userRepository: UserRepository;

    public constructor(
        userService: UserService,
        userRepository: UserRepository,
    ) {
        this.userService = userService;
        this.userRepository = userRepository;
    }

    public async signIn(
        userRequestDto: UserSignUpRequestDto,
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

        const userByEmail = await this.userRepository.findByEmail(email);
        if (userByEmail) {
            throw new HttpError({
                message: 'User already exist.',
                cause: 'Email already used',
                status: HttpCode.CONFLICT,
            });
        }

        const user = await this.userService.create(userRequestDto);
        const { id } = user;

        return {
            ...user,
            token: await tokenService.create({ id }),
        };
    }

    public async verifyLoginCredentials({
        email,
        password,
    }: UserSignInRequestDto): Promise<{ id: number; email: string }> {
        const user = await this.userRepository.findByEmail(email);

        if (!user) {
            throw new Error('Incorrect email');
        }

        const isEqualPassword = await cryptCompare(password, password);
        if (!isEqualPassword) {
            throw new Error('Password not match');
        }

        return user.toObject();
    }
}

export { AuthService };
