import { type Knex } from 'knex';

import {
    personalityBadges,
    scoreBadges,
    softSkillsBadges,
} from '~/seed-data/bsa-badges-seed-data.js';

const SEED = {
    TABLE_NAME: 'bsa_badges',
    COLUMN_NAME: {
        NAME: 'name',
        TYPE: 'type',
    },
};

const BadgesTypes = {
    PERSONALITY: 'personality',
    SOFT_SKILLS: 'soft skills',
    BSA_SCORE: 'BSA score',
};

async function seed(knex: Knex): Promise<void> {
    await knex.transaction(async (trx) => {
        await knex(SEED.TABLE_NAME).del();

        const scoreBadgesMappedSeed = scoreBadges.map((badge) => ({
            ...badge,
            [SEED.COLUMN_NAME.TYPE]: BadgesTypes.BSA_SCORE,
        }));
        await trx(SEED.TABLE_NAME).insert(scoreBadgesMappedSeed);

        const personalityBadgesMappedSeed = personalityBadges.map(
            (badgeName) => ({
                [SEED.COLUMN_NAME.NAME]: badgeName,
                [SEED.COLUMN_NAME.TYPE]: BadgesTypes.PERSONALITY,
            }),
        );
        await trx(SEED.TABLE_NAME).insert(personalityBadgesMappedSeed);

        const softSkillsBadgesMappedSeed = softSkillsBadges.map(
            (badgeName) => ({
                [SEED.COLUMN_NAME.NAME]: badgeName,
                [SEED.COLUMN_NAME.TYPE]: BadgesTypes.SOFT_SKILLS,
            }),
        );
        await trx(SEED.TABLE_NAME).insert(softSkillsBadgesMappedSeed);
    });
}

export { seed };
