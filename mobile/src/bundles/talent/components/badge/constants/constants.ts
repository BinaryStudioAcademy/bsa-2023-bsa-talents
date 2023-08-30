import { BadgeType } from '~/bundles/talent/enums/enums';

// TODO: refactor when there'll be real data

const DEFAULT_VALUE_IS_CHECKED = {
    [BadgeType.AVERAGE_PROJECT_SCORE]: true,
    [BadgeType.AVERAGE_LECTURE_SCORE]: true,
    [BadgeType.COMMUNICATION_SCORE]: false,
    [BadgeType.LEVEL_OF_ENGLISH]: true,
    [BadgeType.PUNCTUALITY]: false,
    [BadgeType.WORKING_WITH_TEAM_SCORE]: false,
};

const DEFAULT_VALUE_IS_DISABLED = {
    [BadgeType.AVERAGE_PROJECT_SCORE]: true,
    [BadgeType.AVERAGE_LECTURE_SCORE]: true,
    [BadgeType.COMMUNICATION_SCORE]: false,
    [BadgeType.LEVEL_OF_ENGLISH]: true,
    [BadgeType.PUNCTUALITY]: false,
    [BadgeType.WORKING_WITH_TEAM_SCORE]: false,
};

export { DEFAULT_VALUE_IS_CHECKED, DEFAULT_VALUE_IS_DISABLED };
