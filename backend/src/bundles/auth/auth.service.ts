import {
    type UserSignUpRequestDto,
    type UserSignUpResponseDto,
} from '~/bundles/users/types/types.js';
import { type UserService } from '~/bundles/users/user.service.js';

import { createToken } from './helpers/helpers.js';

class AuthService {
    private userService: UserService;

    public constructor(userService: UserService) {
        this.userService = userService;
    }

    private async login(
        id: number,
    ): Promise<{ id: number; email: string; token: string }> {
        const user = await this.userService.find(id);
        return {
            ...user,
            token: await createToken({ id }),
        };
    }

    public async signUp(
        userRequestDto: UserSignUpRequestDto,
    ): Promise<UserSignUpResponseDto> {
        const user = await this.userService.create(userRequestDto);
        return this.login(user.id);
    }
}

export { AuthService };
