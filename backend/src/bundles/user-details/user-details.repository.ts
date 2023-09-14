import { type UserDetailsSearchUsersRequestDto } from 'shared/build/index.js';
import { ErrorMessages } from 'shared/build/index.js';

import { type Repository } from '~/common/types/types.js';

import {
    type UserDetailsCreateRequestDto,
    type UserDetailsFindRequestDto,
    type UserDetailsUpdateDto,
} from './types/types.js';
import { UserDetailsEntity } from './user-details.entity.js';
import { type UserDetailsModel } from './user-details.model.js';

class UserDetailsRepository implements Repository {
    private userDetailsModel: typeof UserDetailsModel;

    public constructor(userDetailsModel: typeof UserDetailsModel) {
        this.userDetailsModel = userDetailsModel;
    }

    public async find(
        payload: UserDetailsFindRequestDto,
    ): Promise<UserDetailsEntity | null> {
        const details = await this.userDetailsModel
            .query()
            .findOne({ ...payload });

        if (!details) {
            return null;
        }

        return UserDetailsEntity.initialize({
            id: details.id,
            userId: details.userId,
            isApproved: details.isApproved,
            deniedReason: details.deniedReason,
            isHired: details.isHired,
            profileName: details.profileName,
            salaryExpectation: details.salaryExpectation,
            hiredSalary: details.hiredSalary,
            jobTitle: details.jobTitle,
            location: details.location,
            experienceYears: details.experienceYears,
            employmentType: details.employmentType ?? [],
            description: details.description ?? '',
            englishLevel: details.englishLevel,
            notConsidered: details.notConsidered ?? [],
            preferredLanguages: details.preferredLanguages ?? [],
            projectLinks: details.projectLinks ?? [],
            photoId: details.photoId,
            fullName: details.fullName ?? '',
            phone: details.phone ?? '',
            linkedinLink: details.linkedinLink ?? '',
            companyName: details.companyName ?? '',
            companyLogoId: details.companyLogoId,
            companyWebsite: details.companyWebsite ?? '',
            employerPosition: details.employerPosition ?? '',
            cvId: details.cvId,
            completedStep: details.completedStep,
        });
    }

    public findAll(): ReturnType<Repository['findAll']> {
        throw new Error(ErrorMessages.NOT_IMPLEMENTED);
    }

    public async searchUsers(
        payload: UserDetailsSearchUsersRequestDto,
    ): Promise<UserDetailsEntity[]> {
        const query = this.userDetailsModel.query().where((builder) => {
            if (payload.searchValue) {
                void builder.where(
                    'fullName',
                    'ilike',
                    `%${payload.searchValue}%`,
                );
            }

            if (payload.searchActiveCandidatesOnly) {
                void builder.where(
                    'isHired',
                    payload.searchActiveCandidatesOnly,
                );
            }

            if (payload.jobTitle) {
                void builder.where('jobTitle', payload.jobTitle);
            }

            if (payload.yearsOfExperience) {
                void builder.where(
                    'experienceYears',
                    payload.yearsOfExperience,
                );
            }

            if (payload.hardSkills && payload.hardSkills.length > 0) {
                void builder.whereExists(
                    this.userDetailsModel
                        .relatedQuery('talentHardSkills')
                        .alias('ths')
                        .whereIn('hard_skill_id', payload.hardSkills),
                );
            }

            if (payload.BSABadges && payload.BSABadges.length > 0) {
                void builder.whereExists(
                    this.userDetailsModel
                        .relatedQuery('talentBadges')
                        .whereIn('badge_id', payload.BSABadges),
                );
            }

            if (payload.location) {
                void builder.where('location', payload.location);
            }

            if (payload.englishLevel) {
                void builder.where('englishLevel', payload.englishLevel);
            }

            if (payload.employmentType && payload.employmentType.length > 0) {
                void builder.whereRaw(
                    `"employment_type" @> ARRAY[${payload.employmentType
                        .map((type) => `'${type}'`)
                        .join(', ')}]::text[]`,
                );
            }

            // TODO add BSA characteristics
            // TODO add BSA project name
        });

        const searchResults = await query;

        return searchResults.map((result) =>
            UserDetailsEntity.initialize(result),
        );
    }

    public async create(
        payload: UserDetailsCreateRequestDto,
    ): Promise<UserDetailsEntity> {
        const details = await this.userDetailsModel
            .query()
            .insert({
                ...payload,
            })
            .returning('*')
            .execute();

        return UserDetailsEntity.initialize({
            id: details.id,
            userId: details.userId,
            isApproved: details.isApproved,
            deniedReason: details.deniedReason,
            isHired: details.isHired,
            profileName: details.profileName,
            salaryExpectation: details.salaryExpectation,
            hiredSalary: details.hiredSalary,
            jobTitle: details.jobTitle,
            location: details.location,
            experienceYears: details.experienceYears,
            employmentType: details.employmentType ?? [],
            description: details.description ?? '',
            englishLevel: details.englishLevel,
            notConsidered: details.notConsidered ?? [],
            preferredLanguages: details.preferredLanguages ?? [],
            projectLinks: details.projectLinks ?? [],
            photoId: details.photoId,
            fullName: details.fullName ?? '',
            phone: details.phone ?? '',
            linkedinLink: details.linkedinLink ?? '',
            companyName: details.companyName ?? '',
            companyLogoId: details.companyLogoId,
            companyWebsite: details.companyWebsite ?? '',
            employerPosition: details.employerPosition ?? '',
            cvId: details.cvId,
            completedStep: details.completedStep,
        });
    }

    public async update(
        payload: UserDetailsUpdateDto,
    ): Promise<UserDetailsEntity> {
        const { id, ...rest } = payload;

        const details = await this.userDetailsModel
            .query()
            .patchAndFetchById(id, rest);

        return UserDetailsEntity.initialize({
            id: details.id,
            userId: details.userId,
            isApproved: details.isApproved,
            deniedReason: details.deniedReason,
            isHired: details.isHired,
            profileName: details.profileName,
            salaryExpectation: details.salaryExpectation,
            hiredSalary: details.hiredSalary,
            jobTitle: details.jobTitle,
            location: details.location,
            experienceYears: details.experienceYears,
            employmentType: details.employmentType ?? [],
            description: details.description ?? '',
            englishLevel: details.englishLevel,
            notConsidered: details.notConsidered ?? [],
            preferredLanguages: details.preferredLanguages ?? [],
            projectLinks: details.projectLinks ?? [],
            photoId: details.photoId,
            fullName: details.fullName ?? '',
            phone: details.phone ?? '',
            linkedinLink: details.linkedinLink ?? '',
            companyName: details.companyName ?? '',
            companyLogoId: details.companyLogoId,
            companyWebsite: details.companyWebsite ?? '',
            employerPosition: details.employerPosition ?? '',
            cvId: details.cvId,
            completedStep: details.completedStep,
        });
    }

    public delete(): Promise<boolean> {
        throw new Error(ErrorMessages.NOT_IMPLEMENTED);
    }
}

export { UserDetailsRepository };
