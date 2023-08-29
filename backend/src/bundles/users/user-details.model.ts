import { Model } from 'objection';

import { FileModel } from '~/bundles/files/files.js';
import {
    type CountryList,
    type EmploymentType,
    type EnglishLevel,
    type JobTitle,
    type NotConsidered,
    type PreferredLanguages,
} from '~/bundles/users/types/types.js';
import {
    AbstractModel,
    DatabaseTableName,
} from '~/common/database/database.js';

import { HardSkillsModel } from '../hard-skills/hard-skills.model.js';
import { TalentBadgeModel } from '../talent-badges/talent-badge.model.js';
import { UserModel } from './user.model.js';

class UserDetailsModel extends AbstractModel {
    public 'userId': string;

    public 'isApproved': boolean;

    public 'deniedReason': string | null;

    public 'isHired': boolean;

    public 'profileName': string | null;

    public 'salaryExpectation': number | null;

    public 'hiredSalary': number | null;

    public 'jobTitle': JobTitle | null;

    public 'location': CountryList | null;

    public 'experienceYears': number | null;

    public 'employmentType': EmploymentType[] | null;

    public 'description': string | null;

    public 'englishLevel': EnglishLevel | null;

    public 'notConsidered': NotConsidered[] | null;

    public 'preferredLanguages': PreferredLanguages[] | null;

    public 'projectLinks': string[] | null;

    public 'photoId': string | null;

    public 'fullName': string;

    public 'phone': string | null;

    public 'linkedinLink': string | null;

    public 'companyName': string | null;

    public 'companyLogoId': string | null;

    public 'companyWebsite': string | null;

    public 'employerPosition': string | null;

    public 'cvId': string | null;

    public 'talentHardSkills': HardSkillsModel[];

    public 'talentBadges': TalentBadgeModel[];

    public static override get tableName(): string {
        return DatabaseTableName.USER_DETAILS;
    }

    public static override relationMappings = {
        user: {
            relation: Model.HasOneRelation,
            modelClass: UserModel,
            join: {
                from: 'user_details.userId',
                to: 'users.id',
            },
        },
        photo: {
            relation: Model.HasOneRelation,
            modelClass: FileModel,
            join: {
                from: 'user_details.photoId',
                to: 'files.id',
            },
        },
        cv: {
            relation: Model.HasOneRelation,
            modelClass: FileModel,
            join: {
                from: 'user_details.cvId',
                to: 'files.id',
            },
        },
        companyLogo: {
            relation: Model.HasOneRelation,
            modelClass: FileModel,
            join: {
                from: 'user_details.companyLogoId',
                to: 'files.id',
            },
        },
        talentHardSkills: {
            relation: Model.ManyToManyRelation,
            modelClass: HardSkillsModel,
            join: {
                from: 'user_details.id',
                through: {
                    from: 'talent_hard_skills.userDetailsId',
                    to: 'talent_hard_skills.hardSkillsId',
                },
                to: 'hard_skills.id',
            },
        },
        talentBadges: {
            relation: Model.HasManyRelation,
            modelClass: TalentBadgeModel,
            join: {
                from: 'user_details.id',
                to: 'talent_badges.userDetailsId',
            },
        },
    };
}

export { UserDetailsModel };
