import { type UserCreationResponseDto } from './user-creation-response-dto.type.js';

type UserSignUpResponseDto = UserCreationResponseDto & { token: string };

export { type UserSignUpResponseDto };
