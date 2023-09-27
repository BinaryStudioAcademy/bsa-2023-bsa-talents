import { type Knex } from 'knex';

import { hardSkillsSeed } from '~/seed-data/hard-skills-seed-data.js';

const SEED = {
    TABLE_NAME: 'hard_skills',
    COLUMN_NAME: 'name',
};

async function seed(knex: Knex): Promise<void> {
    await knex.transaction(async (trx) => {
        await trx(SEED.TABLE_NAME).del();

        const hardSkillsMappedSeed = hardSkillsSeed.map((skill) => ({
            [SEED.COLUMN_NAME]: skill,
        }));
        await trx(SEED.TABLE_NAME).insert(hardSkillsMappedSeed);
    });
}

export { seed };
