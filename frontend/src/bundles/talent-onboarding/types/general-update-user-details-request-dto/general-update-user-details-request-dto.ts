import { type UserDetailsUpdateRequestDto } from 'shared/build/index.js';

type UserDetailsGeneralCustom = UserDetailsUpdateRequestDto & {
    hardSkills?: {
        value: string;
        label: string;
    }[];
    badges?: string[];
    photo?: File | null;
    cv?: File | null;
};

export { type UserDetailsGeneralCustom };
