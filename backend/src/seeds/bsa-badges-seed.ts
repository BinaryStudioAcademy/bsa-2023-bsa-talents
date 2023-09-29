import { type Knex } from 'knex';

import { bsaBadges } from '~/seed-data/bsa-badges-seed-data.js';

const SEED = {
    TABLE_NAME: 'bsa_badges',
};

async function seed(knex: Knex): Promise<void> {
    await knex.transaction(async (trx) => {
        await knex(SEED.TABLE_NAME).del();
        await trx(SEED.TABLE_NAME).insert(bsaBadges);
    });
}

export { seed };
