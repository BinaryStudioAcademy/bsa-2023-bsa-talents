import { type UserDetailsSearchUsersRequestDto } from 'shared/build/index.js';
import { ErrorMessage } from 'shared/build/index.js';

import { type Repository } from '~/common/types/types.js';

import { UserRole } from './enums/enums.js';
import { createSortingUsersParameters } from './helpers/create-sorting-users-parameters.js';
import { searchByColumnValues } from './helpers/search-by-column-values.js';
import { searchByYearsOfExperience } from './helpers/search-by-years-of-experience.js';
import { searchUserByRelativeTable } from './helpers/search-user-by-relative-table.js';
import {
    type UserDetailsCreateDto,
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
            createdAt: details.createdAt,
            publishedAt: details.publishedAt,
        });
    }

    public async findCompanyInfoByUserId(
        payload: UserDetailsFindRequestDto,
    ): Promise<UserDetailsEntity | null> {
        const details = await this.userDetailsModel
            .query()
            .findOne({ ...payload })
            .withGraphFetched('[photo, companyLogo]');

        if (!details) {
            return null;
        }
        const companyLogo = details.companyLogo?.url ?? null;
        const photo = details.photo?.url ?? null;

        return UserDetailsEntity.initialize({
            id: details.id,
            createdAt: details.createdAt,
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
            photoId: photo,
            fullName: details.fullName ?? '',
            phone: details.phone ?? '',
            linkedinLink: details.linkedinLink ?? '',
            companyName: details.companyName ?? '',
            companyLogoId: companyLogo,
            companyWebsite: details.companyWebsite ?? '',
            employerPosition: details.employerPosition ?? '',
            cvId: details.cvId,
            completedStep: details.completedStep,
            publishedAt: details.publishedAt,
        });
    }

    public findUnconfirmedByRole(
        role: 'talent' | 'employer',
    ): Promise<UserDetailsModel[]> {
        return this.userDetailsModel
            .query()
            .joinRelated('user')
            .leftOuterJoinRelated('photo')
            .where('user.role', role)
            .andWhere('isApproved', false)
            .whereNotNull('publishedAt')
            .whereNull('deniedReason')
            .select('user_id', 'photo.url as photoUrl', 'full_name')
            .execute();
    }

    public findAll(): ReturnType<Repository['findAll']> {
        throw new Error(ErrorMessage.NOT_IMPLEMENTED);
    }

    public async findFullInfoByUserId(
        userId: string,
    ): Promise<UserDetailsModel | null> {
        const details = await this.userDetailsModel
            .query()
            .findOne({ userId })
            .withGraphFetched(
                '[talentHardSkills, talentBadges, cv, photo, companyLogo]',
            )
            .execute();

        if (!details) {
            return null;
        }
        return details;
    }

    public async searchUsers(
        payload: UserDetailsSearchUsersRequestDto,
    ): Promise<UserDetailsEntity[]> {
        const query = this.userDetailsModel.query().where((builder) => {
            if (payload.searchValue) {
                void builder.where(
                    'profile_name',
                    'ilike',
                    `%${payload.searchValue}%`,
                );
            }

            //TODO change column name for isSearchActiveCandidatesOnly when it will be created
            if (payload.isSearchActiveCandidatesOnly) {
                void builder.where(
                    'isHired',
                    payload.isSearchActiveCandidatesOnly,
                );
            }

            if (payload.jobTitle && payload.jobTitle.length > 0) {
                void builder.where((subquery) => {
                    searchByColumnValues(
                        subquery,
                        'jobTitle',
                        payload.jobTitle,
                    );
                });
            }

            if (payload.yearsOfExperience) {
                void builder.where((subquery) => {
                    searchByYearsOfExperience(
                        subquery,
                        payload.yearsOfExperience,
                    );
                });
            }

            if (payload.hardSkills && payload.hardSkills.length > 0) {
                searchUserByRelativeTable({
                    builder,
                    values: payload.hardSkills,
                    columnName: 'hard_skill_id',
                    relativeTable: 'talentHardSkills',
                    alias: 'ths',
                });
            }

            if (payload.location) {
                void builder.where((subquery) => {
                    searchByColumnValues(
                        subquery,
                        'location',
                        payload.location,
                    );
                });
            }

            if (payload.englishLevel) {
                void builder.where((subquery) => {
                    searchByColumnValues(
                        subquery,
                        'englishLevel',
                        payload.englishLevel,
                    );
                });
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

        const sortingParameters = createSortingUsersParameters(payload.sortBy);

        await query.orderBy(
            sortingParameters.column,
            sortingParameters.direction,
        );

        const searchResults = await query
            .withGraphJoined('user')
            .where('user.role', '=', UserRole.TALENT);

        return searchResults.map((result) => {
            return UserDetailsEntity.initialize({
                ...result,
                email: result.user?.email,
            });
        });
    }

    public async create(
        payload: UserDetailsCreateDto,
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
            createdAt: details.createdAt,
            publishedAt: details.publishedAt,
        });
    }

    public async update(
        payload: UserDetailsUpdateDto,
    ): Promise<UserDetailsEntity> {
        const { id, ...rest } = payload;

        const details = await this.userDetailsModel
            .query()
            .patchAndFetchById(id as string, rest);

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
            createdAt: details.createdAt,
            publishedAt: details.publishedAt,
        });
    }

    public async publish(
        payload: UserDetailsUpdateDto,
    ): Promise<UserDetailsEntity> {
        const { id } = payload;

        const details = await this.userDetailsModel
            .query()
            .patchAndFetchById(id as string, {
                publishedAt: new Date().toISOString(),
            });

        return UserDetailsEntity.initialize(details);
    }

    public delete(): Promise<boolean> {
        throw new Error(ErrorMessage.NOT_IMPLEMENTED);
    }
}

export { UserDetailsRepository };
