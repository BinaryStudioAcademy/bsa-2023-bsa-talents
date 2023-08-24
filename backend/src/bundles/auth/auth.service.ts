import {
    type UserSignUpRequestDto,
    type UserSignUpResponseDto,
} from '~/bundles/users/types/types.js';
import { type UserService } from '~/bundles/users/user.service.js';
import { token } from '~/common/token/token.js';

class AuthService {
    private userService: UserService;

    public constructor(userService: UserService) {
        this.userService = userService;
    }

    private async signIn(
        id: number,
    ): Promise<{ id: number; email: string; token: string }> {
        const user = await this.userService.find(id);
        return {
            ...user,
            token: await token.create({ id }),
        };
    }

    public async signUp(
        userRequestDto: UserSignUpRequestDto,
    ): Promise<UserSignUpResponseDto> {
        const user = await this.userService.create(userRequestDto);
        return this.signIn(user.id);
    }
}

export { AuthService };
