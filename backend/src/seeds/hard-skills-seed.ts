import { type Knex } from 'knex';

import { hardSkillsSeed } from '~/seed-data/hard-skills-seed-data.js';

const TABLE_NAME = 'hard_skills';

const COLUMN_NAME = 'name';

async function seed(knex: Knex): Promise<void> {
    await knex.transaction(async (trx) => {
        await trx(TABLE_NAME).del();

        const hardSkillsMappedSeed = hardSkillsSeed.map((skill) => ({
            [COLUMN_NAME]: skill,
        }));
        await trx(TABLE_NAME).insert(hardSkillsMappedSeed);
    });
}

export { seed };
