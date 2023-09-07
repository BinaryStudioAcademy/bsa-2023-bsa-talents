import { Grid, Sidebar } from '~/bundles/common/components/components.js';

import { EmployeeFilters } from '../components/components.js';

const Candidates: React.FC = () => {
    return (
        <Grid container>
            <Sidebar />
            <EmployeeFilters />
        </Grid>
    );
};

export { Candidates };
