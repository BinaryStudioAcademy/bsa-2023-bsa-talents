import {
    type BsaBadgesStepDto,
    type UserDetailsCreateRequestDto,
    type UserDetailsResponseDto,
    type UserDetailsUpdateRequestDto,
} from '~/bundles/talent/types/types';

//TODO delete when backend is ready
type HardSkillsDto = {
    hardSkills: { value: string; label: string }[];
};

type PhotoDto = {
    photo: File | null;
};

type CVDto = {
    cv: File | null;
};

type CompanyLogoDto = {
    companyLogo: File | null;
};

type UserDetailsGeneralCreateRequestDto = UserDetailsCreateRequestDto &
    Partial<PhotoDto> &
    Partial<CompanyLogoDto>;

type UserDetailsGeneralRequestDto = UserDetailsUpdateRequestDto &
    Partial<BsaBadgesStepDto> &
    Partial<HardSkillsDto> &
    Partial<PhotoDto> &
    Partial<CVDto> &
    Partial<CompanyLogoDto>;

type UserDetailsGeneralResponseDto = UserDetailsResponseDto &
    Partial<BsaBadgesStepDto> &
    Partial<HardSkillsDto> &
    Partial<PhotoDto> &
    Partial<CVDto> &
    Partial<CompanyLogoDto>;

export {
    type CVDto,
    type HardSkillsDto,
    type PhotoDto,
    type UserDetailsGeneralCreateRequestDto,
    type UserDetailsGeneralRequestDto,
    type UserDetailsGeneralResponseDto,
};
