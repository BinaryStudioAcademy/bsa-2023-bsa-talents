import { mockFeedback, mockSoftSkills } from '~/assets/mock-data/mock-data.js';
import {
    Autocomplete,
    FormControl,
    Grid,
    MultiRead,
    Select,
    Typography,
} from '~/bundles/common/components/components.js';
import { useAppForm } from '~/bundles/common/hooks/hooks.js';

import styles from './styles.module.scss';

// Mock data
const personalityTypeOptions = Object.values({
    DOER: 'Doer',
    CONNECTOR: 'Connector',
    THINKER: 'Thinker',
}).map((type) => ({
    value: type,
    label: type,
}));

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
                    className={styles.body}
                    style={{
                        borderRadius: '8px',
                        border: '1px solid #DCE5FF',
                        padding: '20px',
                    }}
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
                            options={personalityTypeOptions}
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
