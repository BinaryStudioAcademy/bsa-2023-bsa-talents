import { type TalentBadgePatchAndFetch } from './types.js';

type TalentBadgeUpdate = Omit<TalentBadgePatchAndFetch, 'id'>;

export { type TalentBadgeUpdate };
