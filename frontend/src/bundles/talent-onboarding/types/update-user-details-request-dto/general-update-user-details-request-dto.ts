import { type UserDetailsUpdateRequestDto } from 'shared/build/index.js';

type UserDetailsGeneralCustom = UserDetailsUpdateRequestDto & {
    hardSkills?: {
        value: string;
        label: string;
    }[];
    bsaBadges?: string[];
    photo?: File | null;
    cv?: File | null;
};

export { type UserDetailsGeneralCustom };
