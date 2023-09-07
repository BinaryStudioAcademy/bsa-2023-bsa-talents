import { BsaBadgeStepBadgesTitle } from '~/bundles/talent/enums/enums';

// TODO: refactor when there'll be real data

const DEFAULT_VALUE_IS_CHECKED = {
    [BsaBadgeStepBadgesTitle.PROJECT_SCORE]: true,
    [BsaBadgeStepBadgesTitle.LECTURE_SCORE]: true,
    [BsaBadgeStepBadgesTitle.COMMUNICATION_SCORE]: false,
    [BsaBadgeStepBadgesTitle.ENGLISH_LEVEL]: true,
    [BsaBadgeStepBadgesTitle.PUNCTUALITY]: false,
    [BsaBadgeStepBadgesTitle.TEAM_SCORE]: false,
};

const DEFAULT_VALUE_IS_DISABLED = {
    [BsaBadgeStepBadgesTitle.PROJECT_SCORE]: true,
    [BsaBadgeStepBadgesTitle.LECTURE_SCORE]: true,
    [BsaBadgeStepBadgesTitle.COMMUNICATION_SCORE]: false,
    [BsaBadgeStepBadgesTitle.ENGLISH_LEVEL]: true,
    [BsaBadgeStepBadgesTitle.PUNCTUALITY]: false,
    [BsaBadgeStepBadgesTitle.TEAM_SCORE]: false,
};

export { DEFAULT_VALUE_IS_CHECKED, DEFAULT_VALUE_IS_DISABLED };
