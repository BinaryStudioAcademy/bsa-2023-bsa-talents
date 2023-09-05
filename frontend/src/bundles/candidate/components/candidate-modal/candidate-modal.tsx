import { Add as AddIcon } from '@mui/icons-material';
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

import { DEFAULT_CONTACT_CANDIDATE_MODAL } from './constants.js';
import styles from './styles.module.scss';

type FormInput = {
    links: { value: string }[];
    message: string;
    isSaveTemplate: boolean;
};

const CandidateModal: React.FC = () => {
    const [isOpen, setIsOpen] = useState(true);

    const closeModal = useCallback((): void => {
        setIsOpen(false);
    }, []);

    const { control, errors, handleSubmit } = useAppForm<FormInput>({
        defaultValues: DEFAULT_CONTACT_CANDIDATE_MODAL,
    });

    const { fields, append } = useFieldArray({
        name: 'links',
        control,
    });

    const addLink = useCallback(() => {
        append({
            value: '',
        });
    }, [append]);

    const onSubmit: SubmitHandler<FormInput> = useCallback(
        (data: FormInput): void => {
            // eslint-disable-next-line no-console
            console.log(data); // remove later with real logic
        },
        [],
    );

    const handleCheckboxOnChange = useCallback(
        (props: ControllerRenderProps<FormInput, 'isSaveTemplate'>) =>
            (event: React.ChangeEvent<HTMLInputElement>): void => {
                props.onChange(event.target.checked);
            },
        [],
    );

    const renderCheckbox = useCallback(
        ({
            field: props,
        }: {
            field: ControllerRenderProps<FormInput, 'isSaveTemplate'>;
        }): React.ReactElement => {
            return (
                <Checkbox
                    name={props.name}
                    checked={props.value}
                    className={styles.checkbox}
                    onChange={handleCheckboxOnChange(props)}
                    label="Save as template"
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
                                    <Input
                                        key={field.id}
                                        className={getValidClassNames(
                                            styles.link,
                                        )}
                                        type="text"
                                        control={control}
                                        errors={errors}
                                        name={`links.${index}.value`}
                                        placeholder="link"
                                        adornmentText="www."
                                    />
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
                                name={'message'}
                                placeholder="Text"
                                minRows={4}
                                maxRows={7}
                                // text=""
                            />

                            <Controller
                                name={'isSaveTemplate'}
                                control={control}
                                render={renderCheckbox}
                            />
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
