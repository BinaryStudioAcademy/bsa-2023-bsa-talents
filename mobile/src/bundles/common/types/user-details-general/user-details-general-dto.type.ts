import {
    type UserDetailsCreateRequestDto,
    type UserDetailsResponseDto,
    type UserDetailsUpdateRequestDto,
} from '~/bundles/common/types/types';
import { type BsaBadgesStepTypes } from '~/bundles/talent/types/types';

// TODO: replace when we know backend dto

type HardSkillsRequest = {
    talentHardSkills: string[];
};

type HardSkillItemResponse = {
    id: string;
    userDetailsId: string;
    hardSkillId: string;
};

type HardSkillsResponse = {
    talentHardSkills: HardSkillItemResponse[];
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
    Partial<HardSkillsRequest> &
    Partial<PhotoDto> &
    Partial<CVDto> &
    Partial<CompanyLogoDto> &
    Partial<PublishedAt>;

type UserDetailsGeneralResponseDto = UserDetailsResponseDto &
    Partial<BsaBadgesStepTypes> &
    Partial<HardSkillsResponse> &
    Partial<PhotoDto> &
    Partial<CVDto> &
    Partial<CompanyLogoDto> &
    Partial<PublishedAt>;

export {
    type CVDto,
    type HardSkillItemResponse,
    type HardSkillsRequest,
    type HardSkillsResponse,
    type PhotoDto,
    type UserDetailsGeneralCreateRequestDto,
    type UserDetailsGeneralRequestDto,
    type UserDetailsGeneralResponseDto,
};
