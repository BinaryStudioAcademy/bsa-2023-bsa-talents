import { type Knex } from 'knex';

import {
    personalityBadges,
    scoreBadges,
    softSkillsBadges,
} from '~/seed-data/bsa-badges-seed-data.js';

const TABLE_NAME = 'bsa_badges';

const ColumnName = {
    NAME: 'name',
    TYPE: 'type',
};

const BadgesTypes = {
    PERSONALITY: 'personality',
    SOFT_SKILLS: 'soft skills',
    BSA_SCORE: 'BSA score',
};

async function seed(knex: Knex): Promise<void> {
    try {
        await knex.transaction(async (trx) => {
            await knex(TABLE_NAME).del();

            const scoreBadgesMappedSeed = scoreBadges.map((badge) => ({
                ...badge,
                [ColumnName.TYPE]: BadgesTypes.BSA_SCORE,
            }));
            await trx(TABLE_NAME).insert(scoreBadgesMappedSeed);

            const personalityBadgesMappedSeed = personalityBadges.map(
                (badgeName) => ({
                    [ColumnName.NAME]: badgeName,
                    [ColumnName.TYPE]: BadgesTypes.PERSONALITY,
                }),
            );
            await trx(TABLE_NAME).insert(personalityBadgesMappedSeed);

            const softSkillsBadgesMappedSeed = softSkillsBadges.map(
                (badgeName) => ({
                    [ColumnName.NAME]: badgeName,
                    [ColumnName.TYPE]: BadgesTypes.SOFT_SKILLS,
                }),
            );
            await trx(TABLE_NAME).insert(softSkillsBadgesMappedSeed);
        });
    } catch (error) {
        // eslint-disable-next-line no-console
        console.log(`Seeding error: ${error}`);
    }
}

export { seed };
