import {
    Add as AddIcon,
    DeleteOutline as DeleteIcon,
} from '@mui/icons-material';
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
import { MessageTemplate } from '../components.js';
import { DEFAULT_CONTACT_CANDIDATE_MODAL, MODAL_CONST } from './constants.js';
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

    const addLink = useCallback((): void => {
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

    const { control: templateControl, errors: templateErrors } = useAppForm({
        defaultValues: { templates: messageTemplates },
    });

    return (
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
                                                styles.deleteButton,
                                            )}
                                            label=""
                                            onClick={removeLink(index)}
                                            variant="outlined"
                                            endIcon={
                                                <DeleteIcon
                                                    className={
                                                        styles.deleteIcon
                                                    }
                                                />
                                            }
                                        />
                                    </Grid>
                                </Grid>
                            );
                        })}
                        <Button
                            className={getValidClassNames(
                                styles.button,
                                styles.addLink,
                            )}
                            disabled={fields.length === MODAL_CONST.MAX_LINKS}
                            onClick={addLink}
                            variant="text"
                            label="Add more links"
                            startIcon={<AddIcon />}
                            color="primary"
                        />
                        {errors.links && (
                            <FormHelperText className={styles.error}>
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
                            name="message"
                            placeholder="Text"
                            minRows={4}
                            maxRows={7}
                        />
                        {errors.message && (
                            <FormHelperText className={styles.error}>
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
                                control={control}
                                errors={errors}
                                name={'templateName'}
                                placeholder="Template name"
                            />
                        )}
                    </FormControl>

                    {messageTemplates.length >
                        MODAL_CONST.EMPTY_ARRAY_LENGTH && (
                        <Grid>
                            <Typography
                                variant="body1"
                                className={styles.templates}
                            >
                                Templates
                            </Typography>
                            {messageTemplates.map((template, index) => {
                                return (
                                    <MessageTemplate
                                        key={template.name}
                                        template={template}
                                        templates={messageTemplates}
                                        applyTemplate={applyTemplate}
                                        control={templateControl}
                                        errors={templateErrors}
                                        name={`templates.${index}.name`}
                                    />
                                );
                            })}
                        </Grid>
                    )}
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
    );
};

export { CandidateModal };
