import { ApiPath, ContentType } from '~/bundles/common/enums/enums';
import { UserDetailsApiPath } from '~/bundles/talent/enums/enums';
import {
    type BadgeStepDto,
    type SkillsStepDto,
    type UserDetailsCreateRequestDto,
    type UserDetailsFindRequestDto,
    type UserDetailsResponseDto,
    type UserDetailsUpdateDto,
    type UserDetailsUpdateRequestDto,
} from '~/bundles/talent/types/types';
import { HttpApiBase } from '~/framework/api/api';
import { type Http } from '~/framework/http/http';
import { type Storage } from '~/framework/storage/storage';

type Constructor = {
    baseUrl: string;
    http: Http;
    storage: Storage;
};

class TalentApi extends HttpApiBase {
    public constructor({ baseUrl, http, storage }: Constructor) {
        super({ path: ApiPath.USER_DETAILS, baseUrl, http, storage });
    }

    public async completeTalentDetails(
        payload: UserDetailsCreateRequestDto,
    ): Promise<UserDetailsResponseDto> {
        const response = await this.load(
            this.getFullEndpoint(UserDetailsApiPath.ROOT, {}),
            {
                method: 'POST',
                contentType: ContentType.JSON,
                payload: JSON.stringify(payload),
                hasAuth: true,
            },
        );
        return await response.json<UserDetailsResponseDto>();
    }

    public async completeOnboardingStep(
        payload: UserDetailsUpdateRequestDto,
    ): Promise<UserDetailsUpdateDto> {
        const response = await this.load(
            this.getFullEndpoint(UserDetailsApiPath.ROOT, {}),
            {
                method: 'PATCH',
                contentType: ContentType.JSON,
                payload: JSON.stringify(payload),
                hasAuth: true,
            },
        );
        return await response.json<UserDetailsUpdateDto>();
    }

    // public async getTalentDetailsById(
    //     payload: UserDetailsFindByUserIdRequestDto,
    // ): Promise<UserDetailsResponseDto | null> {
    //     const { userId = '' } = payload;
    // const response = await this.load(
    //     this.getFullEndpoint(UserDetailsApiPath.ROOT, userId, {}),
    //     {
    //         method: 'GET',
    //         contentType: ContentType.JSON,
    //         hasAuth: true,
    //     },
    // );
    // return await response.json<UserDetailsResponseDto>();

    //TODO delete when backend is ready
    public getTalentDetailsById(
        payload: UserDetailsFindRequestDto,
    ): UserDetailsResponseDto | null {
        const { userId = '' } = payload;
        const fakeTalentDetailsData: UserDetailsResponseDto = {
            id: '329d3d03-30af-4ca7-87f2-c253d47449f9',
            userId: userId,
            isApproved: false,
            deniedReason: null,
            isHired: false,
            profileName: 'Fake Profile name',
            salaryExpectation: 9999,
            hiredSalary: null,
            jobTitle: '.NET Developer',
            location: 'Algeria',
            experienceYears: 3,
            employmentType: ['Remotely'],
            description: 'Fake Description',
            englishLevel: null,
            notConsidered: null,
            preferredLanguages: null,
            projectLinks: null,
            photoId: null,
            fullName: 'Fake Full name',
            phone: null,
            linkedinLink: null,
            companyName: null,
            companyLogoId: null,
            companyWebsite: null,
            employerPosition: null,
            cvId: null,
        };

        return fakeTalentDetailsData;
    }

    //TODO temporary
    public completeBadgesStep(payload: BadgeStepDto): BadgeStepDto {
        return payload;
    }
    public completeSkillsStep(payload: SkillsStepDto): SkillsStepDto {
        return payload;
    }
}

export { TalentApi };
