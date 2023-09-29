import { type TalentBadge, type UploadedFile } from 'shared/build/index';

import { type FileRole } from '~/bundles/common/enums/enums';
import {
    type UserDetailsCreateRequestDto,
    type UserDetailsResponseDto,
    type UserDetailsUpdateRequestDto,
} from '~/bundles/common/types/types';

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

type Badges = {
    badges?: TalentBadge[] | string[];
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
    Partial<Badges> &
    Partial<HardSkillsRequest> &
    Partial<PhotoDto> &
    Partial<CVDto> &
    Partial<CompanyLogoDto> &
    Partial<PublishedAt>;

type UserDetailsGeneralResponseDto = UserDetailsResponseDto &
    Partial<Badges> &
    Partial<HardSkillsResponse> &
    Partial<PhotoDto> &
    Partial<CVDto> &
    Partial<CompanyLogoDto> &
    Partial<PublishedAt>;

type FileUploadResponse = {
    [FileRole.COMPANY_LOGO]?: UploadedFile;
    [FileRole.CV]?: UploadedFile;
    [FileRole.PHOTO]?: UploadedFile;
};

export {
    type CVDto,
    type FileUploadResponse,
    type HardSkillItemResponse,
    type HardSkillsRequest,
    type HardSkillsResponse,
    type PhotoDto,
    type UserDetailsGeneralCreateRequestDto,
    type UserDetailsGeneralRequestDto,
    type UserDetailsGeneralResponseDto,
};
