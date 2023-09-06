import { BadgeStepBadgesTitle } from '~/bundles/talent/enums/enums';

// TODO: refactor when there'll be real data

const DEFAULT_VALUE_IS_CHECKED = {
    [BadgeStepBadgesTitle.PROJECT_SCORE]: true,
    [BadgeStepBadgesTitle.LECTURE_SCORE]: true,
    [BadgeStepBadgesTitle.COMMUNICATION_SCORE]: false,
    [BadgeStepBadgesTitle.ENGLISH_LEVEL]: true,
    [BadgeStepBadgesTitle.PUNCTUALITY]: false,
    [BadgeStepBadgesTitle.TEAM_SCORE]: false,
};

const DEFAULT_VALUE_IS_DISABLED = {
    [BadgeStepBadgesTitle.PROJECT_SCORE]: true,
    [BadgeStepBadgesTitle.LECTURE_SCORE]: true,
    [BadgeStepBadgesTitle.COMMUNICATION_SCORE]: false,
    [BadgeStepBadgesTitle.ENGLISH_LEVEL]: true,
    [BadgeStepBadgesTitle.PUNCTUALITY]: false,
    [BadgeStepBadgesTitle.TEAM_SCORE]: false,
};

export { DEFAULT_VALUE_IS_CHECKED, DEFAULT_VALUE_IS_DISABLED };
