import {
    type UserDetailsCreateRequestDto,
    type UserDetailsResponseDto,
    type UserDetailsUpdateRequestDto,
} from '~/bundles/common/types/types';
import { type BsaBadgesStepDto } from '~/bundles/talent/types/types';

type HardSkillsDto = {
    hardSkills: { value: string; label: string }[];
};

//TODO delete when backend is ready
type PhotoDto = {
    photo: File | null;
};

//TODO delete when backend is ready
type CVDto = {
    cv: File | null;
};

//TODO delete when backend is ready
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
