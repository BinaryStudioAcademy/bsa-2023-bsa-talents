import { Add as AddIcon, CloseRounded as CloseIcon } from '@mui/icons-material';
import { FormHelperText } from '@mui/material';
import {
    Controller,
    type ControllerRenderProps,
    type SubmitHandler,
    useFieldArray,
} from 'react-hook-form';

import {
    Button,
    Checkbox,
    FormControl,
    FormLabel,
    Grid,
    Input,
    Modal,
    Textarea,
    Typography,
} from '~/bundles/common/components/components.js';
import { getValidClassNames } from '~/bundles/common/helpers/helpers.js';
import {
    useAppForm,
    useCallback,
    useState,
} from '~/bundles/common/hooks/hooks.js';

import { type ContactCandidateDto } from '../../types/types.js';
import { ContactCandidateValidationSchema } from '../../validation-schemas/validation-schemas.js';
import { DEFAULT_CONTACT_CANDIDATE_MODAL } from './constants.js';
import styles from './styles.module.scss';

// type ContactCandidateDto = {
//     links: { value: string }[];
//     message: string;
//     isSaveTemplate: boolean;
//     templateName: string;
// };

const CandidateModal: React.FC = () => {
    const [isOpen, setIsOpen] = useState(true);
    const [isSaveTemplateChecked, setIsSaveTemplateChecked] = useState(false);

    const closeModal = useCallback((): void => {
        setIsOpen(false);
    }, []);

    const { control, errors, handleSubmit } = useAppForm<ContactCandidateDto>({
        defaultValues: DEFAULT_CONTACT_CANDIDATE_MODAL,
        validationSchema: ContactCandidateValidationSchema,
    });

    const { fields, append, remove } = useFieldArray({
        name: 'links',
        control,
    });

    const addLink = useCallback(() => {
        append({
            value: '',
        });
    }, [append]);

    const removeLink = useCallback(
        (index: number) => (): void => {
            remove(index);
        },
        [remove],
    );

    const onSubmit: SubmitHandler<ContactCandidateDto> = useCallback(
        (data: ContactCandidateDto): void => {
            // eslint-disable-next-line no-console
            console.log(data); // remove later with real logic
        },
        [],
    );

    const handleCheckboxOnChange = useCallback(
        (props: ControllerRenderProps<ContactCandidateDto, 'isSaveTemplate'>) =>
            (event: React.ChangeEvent<HTMLInputElement>): void => {
                props.onChange(event.target.checked);
                setIsSaveTemplateChecked(event.target.checked);
            },
        [],
    );

    const renderCheckbox = useCallback(
        ({
            field: props,
        }: {
            field: ControllerRenderProps<ContactCandidateDto, 'isSaveTemplate'>;
        }): React.ReactElement => {
            return (
                <Checkbox
                    name={props.name}
                    checked={props.value}
                    className={styles.checkbox}
                    onChange={handleCheckboxOnChange(props)}
                    label="Save as a template"
                />
            );
        },
        [handleCheckboxOnChange],
    );

    const handleFormSubmit = useCallback(
        (event_: React.BaseSyntheticEvent): void => {
            void handleSubmit(onSubmit)(event_);
        },
        [handleSubmit, onSubmit],
    );

    return (
        isOpen && (
            <Modal isOpen onClose={closeModal} headerLabel="Contact candidate">
                <form
                    className={getValidClassNames(styles.form)}
                    onSubmit={handleFormSubmit}
                >
                    <Grid alignItems="start">
                        <Typography variant="h6">
                            Send the first message to the candidate
                        </Typography>
                        <FormControl
                            className={getValidClassNames(
                                styles.links,
                                styles.formControl,
                            )}
                        >
                            <FormLabel className={styles.label}>
                                <Typography variant="label">
                                    Add link to the vacancy
                                </Typography>
                            </FormLabel>
                            {fields.map((field, index) => {
                                return (
                                    <Grid key={index}>
                                        <Grid
                                            className={styles.linkWrapper}
                                            key={field.id}
                                        >
                                            <Input
                                                className={getValidClassNames(
                                                    styles.link,
                                                )}
                                                control={control}
                                                errors={errors}
                                                name={`links.${index}.value`}
                                                placeholder="link"
                                                adornmentText="www."
                                            />
                                            <Button
                                                className={getValidClassNames(
                                                    styles.button,
                                                    styles.closeButton,
                                                )}
                                                label=""
                                                onClick={removeLink(index)}
                                                variant="outlined"
                                                endIcon={
                                                    <CloseIcon
                                                        className={
                                                            styles.closeIcon
                                                        }
                                                    />
                                                }
                                            />
                                        </Grid>
                                        {errors.links?.[index]?.value && (
                                            <FormHelperText error>
                                                {
                                                    errors.links[index]?.value
                                                        ?.message
                                                }
                                            </FormHelperText>
                                        )}
                                    </Grid>
                                );
                            })}
                            <Button
                                className={getValidClassNames(
                                    styles.button,
                                    styles.addLink,
                                )}
                                onClick={addLink}
                                variant="text"
                                label="Add more links"
                                startIcon={<AddIcon />}
                                color="primary"
                            />
                            {errors.links && (
                                <FormHelperText error>
                                    {errors.links.message}
                                </FormHelperText>
                            )}
                        </FormControl>

                        <FormControl
                            className={getValidClassNames(styles.formControl)}
                        >
                            <FormLabel
                                className={getValidClassNames(
                                    styles.label,
                                    styles.messageLabel,
                                )}
                                required
                            >
                                <Typography variant="label">
                                    Write a message
                                </Typography>
                            </FormLabel>
                            <Textarea
                                className={getValidClassNames(styles.message)}
                                control={control}
                                errors={errors}
                                name={'message'}
                                placeholder="Text"
                                minRows={4}
                                maxRows={7}
                            />
                            {errors.message && (
                                <FormHelperText error>
                                    {errors.message.message}
                                </FormHelperText>
                            )}

                            <Controller
                                name={'isSaveTemplate'}
                                control={control}
                                render={renderCheckbox}
                            />
                            {isSaveTemplateChecked && (
                                <Input
                                    key={'templateName'}
                                    control={control}
                                    errors={errors}
                                    name={'templateName'}
                                    placeholder="Template name"
                                    // defaultValue=''
                                />
                            )}
                        </FormControl>
                        <Button
                            className={getValidClassNames(
                                styles.submit,
                                styles.button,
                            )}
                            type="submit"
                            label="Sent message"
                        />
                    </Grid>
                </form>
            </Modal>
        )
    );
};

export { CandidateModal };
