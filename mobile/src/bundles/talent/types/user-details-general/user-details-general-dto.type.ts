import {
    type BsaBadgesStepDto,
    type UserDetailsResponseDto,
    type UserDetailsUpdateRequestDto,
} from '~/bundles/talent/types/types';

//TODO delete when backend is ready
type HardSkillsDto = {
    hardSkills: { id: string; name: string }[];
};

type PhotoDto = {
    photo: File | null;
};

type CVDto = {
    cv: File | null;
};

type UserDetailsGeneralRequestDto = UserDetailsUpdateRequestDto &
    Partial<BsaBadgesStepDto> &
    Partial<HardSkillsDto> &
    Partial<PhotoDto> &
    Partial<CVDto>;

type UserDetailsGeneralResponseDto = UserDetailsResponseDto &
    Partial<BsaBadgesStepDto> &
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
