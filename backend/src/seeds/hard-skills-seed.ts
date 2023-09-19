import { type Knex } from 'knex';

import { hardSkillsSeed } from '~/seed-data/hard-skills-seed-data.js';

const TableName = 'hard_skills';

const ColumnName = 'name';

async function seed(knex: Knex): Promise<void> {
    try {
        await knex.transaction(async (trx) => {
            await trx(TableName).del();

            const hardSkillsMappedSeed = hardSkillsSeed.map((skill) => ({
                [ColumnName]: skill,
            }));

            await trx(TableName).insert(hardSkillsMappedSeed);
        });
    } catch (error) {
        // eslint-disable-next-line no-console
        console.log(`Seeding error: ${error}`);
    }
}

export { seed };
