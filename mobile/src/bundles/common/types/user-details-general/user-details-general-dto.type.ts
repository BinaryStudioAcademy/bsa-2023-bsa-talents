import {
    type UserDetailsCreateRequestDto,
    type UserDetailsResponseDto,
    type UserDetailsUpdateRequestDto,
} from '~/bundles/common/types/types';
import { type FormattedHardSkillsItem } from '~/bundles/common-data/types/types';
import { type BsaBadgesStepTypes } from '~/bundles/talent/types/types';

// TODO: replace when we know backend dto

type HardSkillsDto = {
    hardSkills: FormattedHardSkillsItem[];
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

type PublishedAt = {
    publishedAt?: string;
};

type UserDetailsGeneralRequestDto = UserDetailsUpdateRequestDto &
    Partial<BsaBadgesStepTypes> &
    Partial<HardSkillsDto> &
    Partial<PhotoDto> &
    Partial<CVDto> &
    Partial<CompanyLogoDto> &
    Partial<PublishedAt>;

type UserDetailsGeneralResponseDto = UserDetailsResponseDto &
    Partial<BsaBadgesStepTypes> &
    Partial<HardSkillsDto> &
    Partial<PhotoDto> &
    Partial<CVDto> &
    Partial<CompanyLogoDto> &
    Partial<PublishedAt>;

export {
    type CVDto,
    type HardSkillsDto,
    type PhotoDto,
    type UserDetailsGeneralCreateRequestDto,
    type UserDetailsGeneralRequestDto,
    type UserDetailsGeneralResponseDto,
};
