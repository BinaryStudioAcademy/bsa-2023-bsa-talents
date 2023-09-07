import {
    Checkbox,
    Grid,
    Typography,
} from '~/bundles/common/components/components.js';

// import { EmploymentType, JobTitle } from '~/bundles/talent-onboarding/enums/enums.js';
import styles from './styles.module.scss';

// const jobTitleOptions = Object.values(JobTitle).map((title)=> ({
//     value: title,
//     label: title,
// }));

// const employmentTypeOptions = Object.values(EmploymentType).map((type) => ({
//     value: type,
//     label: type,
// }));

const EmployeeFilters: React.FC = () => {
    return (
        <Grid container className={styles.wrapper}>
            <Grid item>
                <Typography variant={'h6'} className={styles.title}>
                    Filters
                </Typography>
            </Grid>
            <Grid item>
                <Checkbox label="Active searching takents only" />
            </Grid>
        </Grid>
    );
};

export { EmployeeFilters };
