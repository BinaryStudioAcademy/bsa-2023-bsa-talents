import {
    type UserSignInRequestDto,
    type UserSignInResponseDto,
    type UserSignUpRequestDto,
    type UserSignUpResponseDto,
} from '~/bundles/users/types/types.js';
import { type UserRepository } from '~/bundles/users/user.repository.js';
import { type UserService } from '~/bundles/users/user.service.js';
// TODO: after task #19 merged (getByEmail need)
// import { HttpCode, HttpError } from '~/common/http/http.js';

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

    public async signUp(
        userRequestDto: UserSignUpRequestDto,
    ): Promise<UserSignUpResponseDto> {
        // TODO: after task #19 merged (getByEmail need)
        // const { email } = userRequestDto;
        // const userByEmail = await this.userService.getByEmail(email);
        // if (userByEmail) {
        //     throw new HttpError({
        //         message: 'User already exist.',
        //         cause: 'Email already used',
        //         status: HttpCode.CONFLICT,
        //     });
        // }

        return await this.userService.create(userRequestDto);
    }

    public async verifyLoginCredentials({
        email,
        password,
    }: UserSignInRequestDto): Promise<{ id: number; email: string }> {
        const user = await this.userRepository.findByEmail(email);

        if (!user) {
            throw new Error('Incorrect email');
        }

        // const isEqualPassword = true await cryptCompare(password, password);
        // if (!isEqualPassword) {
        //     throw new Error('Password not match');
        // }
        if (password !== 'HASH') {
            throw new Error('Password not match');
        }

        return user.toObject();
    }

    public async login({ id }: { id: number }): Promise<UserSignInResponseDto> {
        const user = await this.userService.findById(id);

        return {
            token: 'TOKEN', // Change with JWT
            email: user.email,
            id: user.id,
        };
    }
}

export { AuthService };
