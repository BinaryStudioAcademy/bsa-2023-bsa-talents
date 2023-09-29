import { EnglishLevel, EnglishLevelLMS } from '~/bundles/common/enums/enums';
import { type SkillsStepDto } from '~/bundles/talent/types/types';

const SKILLS_AND_PROJECTS_DEFAULT_VALUES: SkillsStepDto = {
    hardSkills: [],
    englishLevel: '',
    notConsidered: [],
    preferredLanguages: [],
    projectLinks: [{ url: '' }],
};

const ENGLISH_LMS_MAP = {
    [EnglishLevelLMS.ADVANCED]: EnglishLevel.ADVANCED,
    [EnglishLevelLMS.ELEMENTARY]: EnglishLevel.ELEMENTARY,
    [EnglishLevelLMS.INTERMEDIATE]: EnglishLevel.INTERMEDIATE,
    [EnglishLevelLMS.PROFICIENT]: EnglishLevel.PROFICIENT,
    [EnglishLevelLMS.PRE_INTERMEDIATE]: EnglishLevel.PRE_INTERMEDIATE,
    [EnglishLevelLMS.UPPER_INTERMEDIATE]: EnglishLevel.UPPER_INTERMEDIATE,
    [EnglishLevelLMS.NO_ENGLISH]: EnglishLevel.NO_ENGLISH,
};

export { ENGLISH_LMS_MAP, SKILLS_AND_PROJECTS_DEFAULT_VALUES };
