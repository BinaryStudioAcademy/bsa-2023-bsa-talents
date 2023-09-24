import { type UserResetPasswordRequestDto } from '~/bundles/users/users.js';

type UserResetPasswordDto = Omit<UserResetPasswordRequestDto, 'resetToken'>;

export { type UserResetPasswordDto };
