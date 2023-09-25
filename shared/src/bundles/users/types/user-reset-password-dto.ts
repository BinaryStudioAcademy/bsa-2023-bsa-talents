import { type UserResetPasswordRequestDto } from './types.js';

type UserResetPasswordDto = Omit<UserResetPasswordRequestDto, 'resetToken'>;

export { type UserResetPasswordDto };
