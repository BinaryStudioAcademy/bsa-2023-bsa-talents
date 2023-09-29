import { type LMSDataServerResponseDto } from 'shared/build/index.js';

import {
    mockPersonalityTypeOptions,
    mockSoftSkills,
} from '~/assets/mock-data/mock-data.js';
import { ONE } from '~/bundles/admin-panel/constants/constants.js';
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

type Properties = {
    lmsData: LMSDataServerResponseDto;
};

const Characteristics: React.FC<Properties> = ({ lmsData }) => {
    const { control, errors } = useAppForm<{
        personalityType: string;
        softSkills: string[];
    }>({
        defaultValues: { personalityType: '', softSkills: [] },
    });

    const { projectCoachesFeedback } = lmsData;
    const feedbackData = projectCoachesFeedback.filter(
        (it) => it.feedback !== null,
    );

    const mappedFeedbBack: {
        title: string;
        text: string;
    }[] = [];

    for (const [index, feedback] of feedbackData.entries()) {
        mappedFeedbBack.push({
            title: `Coach feedback from week ${index + ONE}`,
            text: feedback.feedback as string,
        });
    }

    return (
        <Grid container alignItems="center" className={styles.container}>
            <Grid container item className={styles.feedback}>
                <Typography variant={'label'} className={styles.label}>
                    Feedback
                </Typography>
                <Grid
                    container
                    item
                    className={getValidClassNames(styles.body, styles.feedback)}
                >
                    <MultiRead rows={mappedFeedbBack}></MultiRead>
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
