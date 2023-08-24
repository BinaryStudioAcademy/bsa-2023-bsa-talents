import {
    type UserSignUpRequestDto,
    type UserSignUpResponseDto,
} from '~/bundles/users/types/types.js';
import { type UserService } from '~/bundles/users/user.service.js';
// TODO: after task #19 merged (getByEmail need)
// import { HttpCode, HttpError } from '~/common/http/http.js';

class AuthService {
    private userService: UserService;

    public constructor(userService: UserService) {
        this.userService = userService;
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
}

export { AuthService };
