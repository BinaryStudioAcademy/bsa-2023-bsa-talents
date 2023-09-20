import {
    mockFeedback,
    mockPersonalityTypeOptions,
    mockSoftSkills,
} from '~/assets/mock-data/mock-data.js';
import {
    Autocomplete,
    FormControl,
    Grid,
    MultiRead,
    Select,
    Typography,
} from '~/bundles/common/components/components.js';
import { getValidClassNames } from '~/bundles/common/helpers/helpers.js';
import { useAppForm } from '~/bundles/common/hooks/hooks.js';

import styles from './styles.module.scss';

const Characteristics: React.FC = () => {
    const { control, errors } = useAppForm<{
        personalityType: string;
        softSkills: string[];
    }>({
        defaultValues: { personalityType: '', softSkills: [] },
    });

    return (
        <Grid container className={styles.container}>
            <Grid container item className={styles.feedback}>
                <Typography variant={'label'} className={styles.label}>
                    Feedback
                </Typography>
                <Grid
                    container
                    item
                    className={getValidClassNames(styles.body, styles.feedback)}
                >
                    <MultiRead rows={mockFeedback}></MultiRead>
                </Grid>
            </Grid>

            <Grid container item className={styles.personalityType}>
                <Typography variant={'label'} className={styles.label}>
                    Personality type
                </Typography>

                <Grid container item className={styles.body}>
                    <FormControl className={styles.formControl}>
                        <Select
                            control={control}
                            errors={errors}
                            name={'personalityType'}
                            options={mockPersonalityTypeOptions}
                            placeholder="Option"
                        />
                    </FormControl>
                </Grid>
            </Grid>

            <Grid container item className={styles.softSkills}>
                <Typography variant={'label'} className={styles.label}>
                    Soft skills
                </Typography>
                <Grid container item className={styles.body}>
                    <FormControl className={styles.formControl}>
                        <Autocomplete
                            isFilter={true}
                            name="softSkills"
                            control={control}
                            options={mockSoftSkills}
                            placeholder="Option"
                        />
                    </FormControl>
                </Grid>
            </Grid>
        </Grid>
    );
};

export { Characteristics };
