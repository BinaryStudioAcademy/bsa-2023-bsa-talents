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
    useAppDispatch,
    useAppForm,
    useAppSelector,
    useCallback,
    useState,
} from '~/bundles/common/hooks/hooks.js';

import { actions as candidateActions } from '../../store/candidate.js';
import { type ContactCandidateDto } from '../../types/types.js';
import { ContactCandidateValidationSchema } from '../../validation-schemas/validation-schemas.js';
import { DEFAULT_CONTACT_CANDIDATE_MODAL } from './constants.js';
import styles from './styles.module.scss';

type Properties = {
    isOpen: boolean;
    onClose: () => void;
};

const CandidateModal: React.FC<Properties> = ({ isOpen = true, onClose }) => {
    const [isSaveTemplateChecked, setIsSaveTemplateChecked] = useState(false);

    const dispatch = useAppDispatch();
    const { messageTemplates } = useAppSelector(({ candidate }) => ({
        messageTemplates: candidate.messageTemplates,
    }));

    const { control, errors, handleSubmit, setValue } =
        useAppForm<ContactCandidateDto>({
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

    const applyTemplate = useCallback(
        (message: string) => (): void => {
            setValue('message', message);
        },
        [setValue],
    );

    const removeTemplate = useCallback(
        (templateName: string) => (): void => {
            void dispatch(candidateActions.removeMessageTemplate(templateName));
        },
        [dispatch],
    );

    const onSubmit: SubmitHandler<ContactCandidateDto> = useCallback(
        (data: ContactCandidateDto): void => {
            if (data.templateName) {
                const { templateName: name, message } = data;
                void dispatch(
                    candidateActions.addMessageTemplate({ name, message }),
                );
            }
            // eslint-disable-next-line no-console
            console.log(data); // remove later with real logic
        },
        [dispatch],
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
            <Modal
                isOpen={isOpen}
                onClose={onClose}
                headerLabel="Contact candidate"
            >
                <form className={styles.form} onSubmit={handleFormSubmit}>
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
                                />
                            )}
                        </FormControl>

                        {
                            // eslint-disable-next-line @typescript-eslint/no-magic-numbers
                            messageTemplates.length > 0 && (
                                <Grid>
                                    <Typography
                                        variant="body1"
                                        className={styles.templates}
                                    >
                                        Templates
                                    </Typography>
                                    {messageTemplates.map((template) => {
                                        return (
                                            <Grid
                                                container
                                                justifyContent={'space-between'}
                                                key={template.name}
                                            >
                                                <Button
                                                    className={getValidClassNames(
                                                        styles.button,
                                                        styles.templateButton,
                                                    )}
                                                    onClick={applyTemplate(
                                                        template.message,
                                                    )}
                                                    variant="text"
                                                    label={template.name}
                                                />
                                                <Button
                                                    className={getValidClassNames(
                                                        styles.button,
                                                        styles.closeButton,
                                                    )}
                                                    label=""
                                                    onClick={removeTemplate(
                                                        template.name,
                                                    )}
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
                                        );
                                    })}
                                </Grid>
                            )
                        }
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
