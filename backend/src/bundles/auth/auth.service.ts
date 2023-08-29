import {
    type UserSignUpRequestDto,
    type UserSignUpResponseDto,
} from '~/bundles/users/types/types.js';
import { type UserService } from '~/bundles/users/user.service.js';
import { ErrorMessages } from '~/common/enums/enums.js';
import { HttpCode, HttpError } from '~/common/http/http.js';
import { tokenService } from '~/common/services/services.js';

class AuthService {
    private userService: UserService;

    public constructor(userService: UserService) {
        this.userService = userService;
    }

    public async signIn(id: number): Promise<{ token: string }> {
        return {
            token: await tokenService.create({ id }),
        };
    }

    public async signUp(
        userRequestDto: UserSignUpRequestDto,
    ): Promise<UserSignUpResponseDto> {
        const { email } = userRequestDto;

        const userByEmail = await this.userService.findByEmail(email);

        if (userByEmail) {
            throw new HttpError({
                message: ErrorMessages.USER_ALREADY_EXIST,
                status: HttpCode.BAD_REQUEST,
            });
        }

        const user = await this.userService.create(userRequestDto);

        return { ...user, token: await tokenService.create({ id: user.id }) };
    }
}

export { AuthService };
