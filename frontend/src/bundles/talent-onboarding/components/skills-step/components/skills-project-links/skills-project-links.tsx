import { FormControl, FormLabel, Typography } from '@mui/material';
import { type Control, type FieldErrors } from 'react-hook-form';
import { useFieldArray } from 'react-hook-form';

import { Grid, Input } from '~/bundles/common/components/components.js';
import { getValidClassNames } from '~/bundles/common/helpers/helpers.js';
import { type SkillsStepDto } from '~/bundles/talent-onboarding/types/types.js';

import styles from '../../styles.module.scss';

type Properties = {
    control: Control<SkillsStepDto>;
    errors: FieldErrors<SkillsStepDto>;
};

const SkillsProjectLinks: React.FC<Properties> = ({ control, errors }) => {
    const { fields } = useFieldArray({
        control,
        name: 'projectLinks',
    });

    return (
        <FormControl>
            <FormLabel
                className={getValidClassNames(styles.label, styles.labelMargin)}
            >
                <Typography variant={'label'}>Project links</Typography>
            </FormLabel>

            {fields.map((item, index) => {
                return (
                    <Grid key={item.id} className={styles.projectLinks}>
                        <Input
                            type="text"
                            errors={errors}
                            control={control}
                            adornmentText="www."
                            placeholder="link to BSA project"
                            name={`projectLinks.${index}.url`}
                        />
                    </Grid>
                );
            })}
        </FormControl>
    );
};

export { SkillsProjectLinks };
