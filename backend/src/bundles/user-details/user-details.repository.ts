/* eslint-disable sonarjs/cognitive-complexity */
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

        return details ? UserDetailsEntity.initialize(details) : null;
    }

    public findAll(): ReturnType<Repository['findAll']> {
        throw new Error(ErrorMessages.NOT_IMPLEMENTED);
    }

    public async searchUsers(
        payload: UserDetailsSearchUsersRequestDto,
    ): Promise<UserDetailsEntity[]> {
        const query = this.userDetailsModel.query().where((builder) => {
            if (payload.search) {
                void builder.where('fullName', 'ilike', `%${payload.search}%`);
            }

            if (payload.isHired) {
                void builder.where('isHired', payload.isHired);
            }

            if (payload.jobTitle) {
                void builder.where('jobTitle', payload.jobTitle);
            }

            if (payload.experienceYears) {
                void builder.where('experienceYears', payload.experienceYears);
            }

            if (payload.hardSkills && payload.hardSkills.length > 0) {
                const hardSkillsIdArray = Array.isArray(payload.hardSkills)
                    ? payload.hardSkills
                    : [payload.hardSkills];
                void builder.whereExists(
                    this.userDetailsModel
                        .relatedQuery('talentHardSkills')
                        .whereIn('hard_skill_id', hardSkillsIdArray),
                );
            }

            if (payload.BSABadges && payload.BSABadges.length > 0) {
                const badgeIdArray = Array.isArray(payload.BSABadges)
                    ? payload.BSABadges
                    : [payload.BSABadges];

                void builder.whereExists(
                    this.userDetailsModel
                        .relatedQuery('talentBadges')
                        .whereIn('badge_id', badgeIdArray),
                );
            }

            if (payload.location) {
                void builder.where('location', payload.location);
            }

            if (payload.englishLevel) {
                void builder.where('englishLevel', payload.englishLevel);
            }

            if (payload.employmentType && payload.employmentType.length > 0) {
                const employmentTypes = Array.isArray(payload.employmentType)
                    ? payload.employmentType
                    : [payload.employmentType];

                void builder.whereRaw(
                    `"employment_type" @> ARRAY[${employmentTypes
                        .map((type) => `'${type}'`)
                        .join(', ')}]::text[]`,
                );
            }
        });

        const searchResults = await query;

        return searchResults.map((result) =>
            UserDetailsEntity.initialize(result),
        );
    }

    public async create(
        payload: UserDetailsCreateRequestDto,
    ): Promise<UserDetailsEntity> {
        const newDetails = await this.userDetailsModel
            .query()
            .insert({
                ...payload,
            })
            .returning('*')
            .execute();

        return UserDetailsEntity.initialize(newDetails);
    }

    public async update(
        payload: UserDetailsUpdateDto,
    ): Promise<UserDetailsEntity> {
        const { id, ...rest } = payload;

        const details = await this.userDetailsModel
            .query()
            .patchAndFetchById(id, rest);

        return UserDetailsEntity.initialize(details);
    }

    public delete(): Promise<boolean> {
        throw new Error(ErrorMessages.NOT_IMPLEMENTED);
    }
}

export { UserDetailsRepository };
