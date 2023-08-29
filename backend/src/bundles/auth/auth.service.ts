import {
    type UserFindResponseDto,
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

    public async signIn(id: number): Promise<{ token: string }> {
        return {
            token: await tokenService.create({ id }),
        };
    }

    public async signUp(
        userRequestDto: UserSignUpRequestDto,
    ): Promise<UserSignUpResponseDto> {
        const user = await this.userService.create(userRequestDto);
        return this.signIn(user.toObject().id);
    }

    public async findByToken(
        token: string,
    ): Promise<UserFindResponseDto | undefined> {
        return await this.userService.findByToken(token);
    }
}

export { AuthService };
