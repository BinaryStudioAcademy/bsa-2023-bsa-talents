import {
    type UserSignUpRequestDto,
    type UserSignUpResponseDto,
} from '~/bundles/users/types/types.js';
import { type UserService } from '~/bundles/users/user.service.js';
import { token } from '~/common/packages/packages.js';

class AuthService {
    private userService: UserService;

    public constructor(userService: UserService) {
        this.userService = userService;
    }

    public async signIn(id: number): Promise<{ token: string }> {
        return {
            token: await token.create({ id }),
        };
    }

    public async signUp(
        userRequestDto: UserSignUpRequestDto,
    ): Promise<UserSignUpResponseDto> {
        const user = await this.userService.create(userRequestDto);
        return this.signIn(user.toObject().id);
    }
}

export { AuthService };
