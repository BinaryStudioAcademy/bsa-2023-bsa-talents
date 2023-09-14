import {
    FormControl,
    FormHelperText,
    FormLabel,
    Typography,
} from '@mui/material';
import { type Control, type FieldPath } from 'react-hook-form';
import { useFieldArray } from 'react-hook-form';

import { Button, Grid, Input } from '~/bundles/common/components/components.js';
import { getValidClassNames } from '~/bundles/common/helpers/helpers.js';
import {
    useCallback,
    useFormController,
} from '~/bundles/common/hooks/hooks.js';
import { type SkillsStepDto } from '~/bundles/talent-onboarding/types/types.js';

import { MAX_LINKS } from '../constants/constants.js';
import styles from '../styles.module.scss';
import { CloseIconButton } from './close-icon/close-icon-button.js';

type Properties = {
    control: Control<SkillsStepDto>;
    name: FieldPath<SkillsStepDto>;
};

const SkillsProjectLinks: React.FC<Properties> = ({ control, name }) => {
    const {
        field,
        formState: { errors },
    } = useFormController<SkillsStepDto>({ name, control });

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'projectLinks',
    });

    const appendLinks = useCallback((): void => {
        append({ url: '' });
    }, [append]);

    const removeLink = useCallback(
        (index: number): void => {
            remove(index);
        },
        [remove],
    );

    return (
        <FormControl>
            <FormLabel
                className={getValidClassNames(styles.label, styles.labelMargin)}
            >
                <Typography variant={'label'}>Project links</Typography>
            </FormLabel>

            {fields.map((item, index) => {
                const { ref, name } = field;

                const error = errors.projectLinks?.[index]?.url;
                const message = error?.message;
                const fieldPath =
                    `${name}.${index}.url` as FieldPath<SkillsStepDto>;

                return (
                    <Grid key={item.id} className={styles.projectLinks}>
                        <Input
                            inputRef={ref}
                            type="text"
                            errors={{}}
                            control={control}
                            adornmentText="www."
                            placeholder="link to BSA project"
                            name={fieldPath}
                        />
                        {index !== 0 && (
                            <CloseIconButton
                                index={index}
                                onClick={removeLink}
                            />
                        )}

                        {Boolean(error) && (
                            <FormHelperText className={styles.hasError}>
                                {message}
                            </FormHelperText>
                        )}
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
