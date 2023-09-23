import { type FormattedHardSkillsItem } from '~/bundles/common-data/types/types';
import {
    type BsaBadgesStepTypes,
    type UserDetailsResponseDto,
    type UserDetailsUpdateRequestDto,
} from '~/bundles/talent/types/types';

// TODO: replace when we know backend dto

type HardSkillsDto = {
    hardSkills: FormattedHardSkillsItem[];
};

type PhotoDto = {
    photo: File | null;
};

type CVDto = {
    cv: File | null;
};

type UserDetailsGeneralRequestDto = UserDetailsUpdateRequestDto &
    Partial<BsaBadgesStepTypes> &
    Partial<HardSkillsDto> &
    Partial<PhotoDto> &
    Partial<CVDto>;

type UserDetailsGeneralResponseDto = UserDetailsResponseDto &
    Partial<BsaBadgesStepTypes> &
    Partial<HardSkillsDto> &
    Partial<PhotoDto> &
    Partial<CVDto>;

export {
    type CVDto,
    type HardSkillsDto,
    type PhotoDto,
    type UserDetailsGeneralRequestDto,
    type UserDetailsGeneralResponseDto,
};
