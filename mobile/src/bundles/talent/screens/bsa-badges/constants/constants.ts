import { BsaBadgesStepUncontrolledBadges } from '~/bundles/talent/enums/enums';
import { type BadgesFormDto } from '~/bundles/talent/types/badges-form-dto/badges-form-dto';

const UNCONTROLLED_BADGES = Object.values(BsaBadgesStepUncontrolledBadges);
const BADGES_STEP_DEFAULT_VALUES: BadgesFormDto = {
    badges: [],
};

export { BADGES_STEP_DEFAULT_VALUES, UNCONTROLLED_BADGES };
