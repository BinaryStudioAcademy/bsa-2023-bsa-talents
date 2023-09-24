import { Model } from 'objection';

import { FileModel } from '~/bundles/files/files.js';
import { HardSkillsModel } from '~/bundles/hard-skills/hard-skills.model.js';
import { TalentBadgeModel } from '~/bundles/talent-badges/talent-badge.model.js';
import { UserModel } from '~/bundles/users/user.model.js';
import {
    AbstractModel,
    DatabaseTableName,
    FilesTableColumn,
    HardSkillsTableColumn,
    TalentBadgesTableColumn,
    TalentHardSkillsTableColumn,
    UserDetailsTableColumn,
    UsersTableColumn,
} from '~/common/packages/database/database.js';
import { type ValueOf } from '~/common/types/types.js';

import {
    type CountryList,
    type EmploymentType,
    type EnglishLevel,
    type JobTitle,
    type NotConsidered,
    type OnboardingStep,
    type PreferredLanguages,
} from './enums/enums.js';

class UserDetailsModel extends AbstractModel {
    public 'userId': string;

    public 'isApproved': boolean;

    public 'deniedReason': string | null;

    public 'isHired': boolean;

    public 'profileName': string | null;

    public 'salaryExpectation': number | null;

    public 'hiredSalary': number | null;

    public 'jobTitle': ValueOf<typeof JobTitle> | null;

    public 'location': ValueOf<typeof CountryList> | null;

    public 'experienceYears': number | null;

    public 'employmentType': ValueOf<typeof EmploymentType>[] | null;

    public 'description': string | null;

    public 'englishLevel': ValueOf<typeof EnglishLevel> | null;

    public 'notConsidered': ValueOf<typeof NotConsidered>[] | null;

    public 'preferredLanguages': ValueOf<typeof PreferredLanguages>[] | null;

    public 'projectLinks': string[] | null;

    public 'photoId': string | null;

    public 'fullName': string | null;

    public 'phone': string | null;

    public 'linkedinLink': string | null;

    public 'companyName': string | null;

    public 'companyLogoId': string | null;

    public 'companyWebsite': string | null;

    public 'employerPosition': string | null;

    public 'cvId': string | null;

    public 'talentHardSkills': HardSkillsModel[];

    public 'talentBadges': TalentBadgeModel[];

    public 'completedStep': ValueOf<typeof OnboardingStep>;

    public 'publishedAt': Date;

    public override $afterFind(): void {
        this.experienceYears = Number.parseFloat(String(this.experienceYears));
    }
    public static override get tableName(): string {
        return DatabaseTableName.USER_DETAILS;
    }

    public static override relationMappings = {
        user: {
            relation: Model.HasOneRelation,
            modelClass: UserModel,
            join: {
                from: `${DatabaseTableName.USER_DETAILS}.${UserDetailsTableColumn.USER_ID}`,
                to: `${DatabaseTableName.USERS}.${UsersTableColumn.ID}`,
            },
        },
        photo: {
            relation: Model.HasOneRelation,
            modelClass: FileModel,
            join: {
                from: `${DatabaseTableName.USER_DETAILS}.${UserDetailsTableColumn.PHOTO_ID}`,
                to: `${DatabaseTableName.FILES}.${FilesTableColumn.ID}`,
            },
        },
        cv: {
            relation: Model.HasOneRelation,
            modelClass: FileModel,
            join: {
                from: `${DatabaseTableName.USER_DETAILS}.${UserDetailsTableColumn.CV_ID}`,
                to: `${DatabaseTableName.FILES}.${FilesTableColumn.ID}`,
            },
        },
        companyLogo: {
            relation: Model.HasOneRelation,
            modelClass: FileModel,
            join: {
                from: `${DatabaseTableName.USER_DETAILS}.${UserDetailsTableColumn.COMPANY_LOGO_ID}`,
                to: `${DatabaseTableName.FILES}.${FilesTableColumn.ID}`,
            },
        },
        talentHardSkills: {
            relation: Model.ManyToManyRelation,
            modelClass: HardSkillsModel,
            join: {
                from: `${DatabaseTableName.USER_DETAILS}.${UserDetailsTableColumn.ID}`,
                through: {
                    from: `${DatabaseTableName.TALENT_HARD_SKILLS}.${TalentHardSkillsTableColumn.USER_DETAILS_ID}`,
                    to: `${DatabaseTableName.TALENT_HARD_SKILLS}.${TalentHardSkillsTableColumn.HARD_SKILL_ID}`,
                },
                to: `${DatabaseTableName.HARD_SKILLS}.${HardSkillsTableColumn.ID}`,
            },
        },
        talentBadges: {
            relation: Model.HasManyRelation,
            modelClass: TalentBadgeModel,
            join: {
                from: `${DatabaseTableName.USER_DETAILS}.${UserDetailsTableColumn.ID}`,
                to: `${DatabaseTableName.TALENT_BADGES}.${TalentBadgesTableColumn.USER_DETAILS_ID}`,
            },
        },
    };
}

export { UserDetailsModel };
