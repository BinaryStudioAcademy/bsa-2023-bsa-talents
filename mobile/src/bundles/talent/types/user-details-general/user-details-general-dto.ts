import {
    type BsaBadgesStepDto,
    type UserDetailsResponseDto,
    type UserDetailsUpdateRequestDto,
} from '~/bundles/talent/types/types';

//TODO delete when backend is ready
type HardSkillsDto = {
    hardSkills: { value: string; label: string }[];
};

type UserDetailsGeneralRequestDto = UserDetailsUpdateRequestDto &
    Partial<BsaBadgesStepDto> &
    Partial<HardSkillsDto>;

type UserDetailsGeneralResponseDto = UserDetailsResponseDto &
    Partial<BsaBadgesStepDto> &
    Partial<HardSkillsDto>;

export {
    type HardSkillsDto,
    type UserDetailsGeneralRequestDto,
    type UserDetailsGeneralResponseDto,
};
