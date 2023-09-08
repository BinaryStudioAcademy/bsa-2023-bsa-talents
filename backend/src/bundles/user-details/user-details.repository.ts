import { type UserDetailsSearchUsersRequestDto } from 'shared/build/index.js';
import { ErrorMessages } from 'shared/build/index.js';

import {
    TalentBadgesTableColumn,
    TalentHardSkillsTableColumn,
} from '~/common/packages/database/database.js';
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
        let query = this.userDetailsModel.query();

        if (payload.search) {
            query = query.where('fullName', 'ilike', `%${payload.search}%`);
        }

        if (payload.isHired) {
            query = query.where('isHired', payload.isHired);
        }

        if (payload.jobTitle) {
            query = query.where('jobTitle', payload.jobTitle);
        }

        if (payload.experienceYears) {
            query = query.where('experienceYears', payload.experienceYears);
        }

        if (payload.hardSkills && payload.hardSkills.length > 0) {
            query = query.whereExists(
                this.userDetailsModel
                    .relatedQuery('talentHardSkills')
                    .whereIn(
                        `talent_hard_skills.${TalentHardSkillsTableColumn.HARD_SKILL_ID} = ANY(?)`,
                        [payload.hardSkills],
                    ),
            );
        }

        if (payload.BSABadges && payload.BSABadges.length > 0) {
            query = query.whereExists(
                this.userDetailsModel
                    .relatedQuery('talentBadges')
                    .whereIn(
                        `talent_badges.${TalentBadgesTableColumn.BADGE_ID} = ANY(?)`,
                        [payload.BSABadges],
                    ),
            );
        }

        if (payload.location) {
            query = query.where('location', payload.location);
        }

        if (payload.englishLevel) {
            query = query.where('englishLevel', payload.englishLevel);
        }

        if (payload.employmentType && payload.employmentType.length > 0) {
            query = query.whereIn('employmentType', payload.employmentType);
        }

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
