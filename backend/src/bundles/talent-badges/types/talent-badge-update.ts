import { type TalentBadgePatchAndFetch } from './types.js';

type TalentBadgeUpdate = Omit<TalentBadgePatchAndFetch, 'isShown'>;

export { type TalentBadgeUpdate };
