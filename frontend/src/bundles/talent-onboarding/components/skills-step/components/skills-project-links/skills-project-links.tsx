import { FormControl, FormLabel, Typography } from '@mui/material';
import { type Control, type FieldErrors } from 'react-hook-form';

import { Button, Grid, Input } from '~/bundles/common/components/components.js';
import { getValidClassNames } from '~/bundles/common/helpers/helpers.js';
import { useCallback, useFieldArray } from '~/bundles/common/hooks/hooks.js';
import { type SkillsStepDto } from '~/bundles/talent-onboarding/types/types.js';

import { MAX_LINKS } from '../../constants/constants.js';
import styles from '../../styles.module.scss';

type Properties = {
    control: Control<SkillsStepDto>;
    errors: FieldErrors<SkillsStepDto>;
};

const SkillsProjectLinks: React.FC<Properties> = ({ control, errors }) => {
    const { fields, append } = useFieldArray({
        control,
        name: 'projectLinks',
    });

    const appendLinks = useCallback((): void => {
        append({ url: '' });
    }, [append]);

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

            {fields.length < MAX_LINKS && (
                <Button
                    variant="text"
                    type="button"
                    label="+ Add more links"
                    onClick={appendLinks}
                    className={styles.buttonAddLink}
                />
            )}
        </FormControl>
    );
};

export { SkillsProjectLinks };
