import { type File } from '../../../index.js';
import { type UserDetailsResponseDto } from './types.js';

type UserDetailsFullResponseDto = UserDetailsResponseDto & {
    photo: File | null;
    companyLogo: File | null;
    cv: File | null;
};

export { type UserDetailsFullResponseDto };
