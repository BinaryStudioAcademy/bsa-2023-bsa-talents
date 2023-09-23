import {
    type BadgesFormDto,
    type HardSkillsItem,
    type UserDetailsResponseDto,
    type UserDetailsUpdateRequestDto,
} from '~/bundles/talent/types/types';

// TODO: replace when we know backend dto

type HardSkillsDto = {
    hardSkills: HardSkillsItem[];
};

type PhotoDto = {
    photo: File | null;
};

type CVDto = {
    cv: File | null;
};

type UserDetailsGeneralRequestDto = UserDetailsUpdateRequestDto &
    Partial<BadgesFormDto> &
    Partial<HardSkillsDto> &
    Partial<PhotoDto> &
    Partial<CVDto>;

type UserDetailsGeneralResponseDto = UserDetailsResponseDto &
    Partial<BadgesFormDto> &
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
