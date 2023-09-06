import { type BadgeStepBadgesTitle } from '~/bundles/talent-onboarding/enums/enums.js';

type BadgeStepDto = {
    [BadgeStepBadgesTitle.ENGLISH_LEVEL]: true;
    [BadgeStepBadgesTitle.LECTURE_SCORE]: true;
    [BadgeStepBadgesTitle.PROJECT_SCORE]: true;
    [BadgeStepBadgesTitle.COMMUNICATION_SCORE]: boolean;
    [BadgeStepBadgesTitle.PUNCTUALITY]: boolean;
    [BadgeStepBadgesTitle.TEAM_SCORE]: boolean;
};

export { type BadgeStepDto };
