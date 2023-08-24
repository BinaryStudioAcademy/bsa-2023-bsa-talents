import {
    type UserSignUpRequestDto,
    type UserSignUpResponseDto,
} from '~/bundles/users/types/types.js';
import { type UserService } from '~/bundles/users/user.service.js';
import { tokenService } from '~/common/services/services.js';

class AuthService {
    private userService: UserService;

    public constructor(userService: UserService) {
        this.userService = userService;
    }

    public async signIn(
        id: number,
    ): Promise<{ id: number; email: string; token: string }> {
        const user = await this.userService.findById(id);

        if (!user) {
            throw new Error('User does not exist');
        }

        return {
            ...user,
            token: await tokenService.create({ id }),
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
