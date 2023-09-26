import { type BsaBadgeStepBadgesTitle } from '~/bundles/talent-onboarding/enums/enums.js';

type BadgeStepDto = {
    [BsaBadgeStepBadgesTitle.ENGLISH_LEVEL]: true;
    [BsaBadgeStepBadgesTitle.LECTURE_SCORE]: true;
    [BsaBadgeStepBadgesTitle.PROJECT_SCORE]: true;
    [BsaBadgeStepBadgesTitle.COMMUNICATION_SCORE]: boolean;
    [BsaBadgeStepBadgesTitle.TEAM_SCORE]: boolean;
};

export { type BadgeStepDto };
