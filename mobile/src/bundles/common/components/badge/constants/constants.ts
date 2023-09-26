import { BsaBadgeStepBadgesTitle } from '~/bundles/common/enums/enums';
import { type BsaBadgesStepDto } from '~/bundles/talent/types/types';

// TODO: refactor when there'll be real data
const BADGES_STEP_DEFAULT_VALUES: BsaBadgesStepDto = {
    badges: [
        BsaBadgeStepBadgesTitle.PROJECT_SCORE,
        BsaBadgeStepBadgesTitle.LECTURE_SCORE,
        BsaBadgeStepBadgesTitle.ENGLISH_LEVEL,
    ],
};

const DEFAULT_VALUE_IS_DISABLED = {
    [BsaBadgeStepBadgesTitle.PROJECT_SCORE]: true,
    [BsaBadgeStepBadgesTitle.LECTURE_SCORE]: true,
    [BsaBadgeStepBadgesTitle.COMMUNICATION_SCORE]: false,
    [BsaBadgeStepBadgesTitle.ENGLISH_LEVEL]: true,
    [BsaBadgeStepBadgesTitle.TEAM_SCORE]: false,
};

export { BADGES_STEP_DEFAULT_VALUES, DEFAULT_VALUE_IS_DISABLED };
