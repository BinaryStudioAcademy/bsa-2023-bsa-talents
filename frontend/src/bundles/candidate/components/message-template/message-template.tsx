import {
    CheckOutlined as CheckIcon,
    Close as CloseIcon,
    DeleteOutline as DeleteIcon,
    EditOutlined as EditIcon,
} from '@mui/icons-material';
import {
    type Control,
    type FieldErrors,
    type FieldValues,
    type Path,
} from 'react-hook-form';

import {
    Button,
    FormHelperText,
    Grid,
    Input,
} from '~/bundles/common/components/components.js';
import { getValidClassNames } from '~/bundles/common/helpers/helpers.js';
import {
    useAppDispatch,
    useCallback,
    useState,
} from '~/bundles/common/hooks/hooks.js';

import { actions as candidateActions } from '../../store/candidate.js';
import { type MessageTemplateDto } from '../../types/types.js';
import styles from './styles.module.scss';

type Properties<T extends FieldValues> = {
    template: MessageTemplateDto;
    templates: MessageTemplateDto[];
    control: Control<T, null>;
    errors: FieldErrors<T>;
    name: Path<T>;
    applyTemplate: (message: string) => () => void;
};

const MessageTemplate = <T extends FieldValues>({
    template,
    templates,
    applyTemplate,
    control,
    errors,
    name,
}: Properties<T>): JSX.Element => {
    const dispatch = useAppDispatch();
    const [isEdit, setIsEdit] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [editedName, setEditedName] = useState(template.name);

    const editTemplate = useCallback((): void => {
        setIsEdit(true);
    }, []);

    const cancelTemplateEdit = useCallback((): void => {
        setErrorMessage('');
        setIsEdit(false);
    }, []);

    const handleNameChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>): void => {
            if (errorMessage) {
                setErrorMessage('');
            }
            setEditedName(event.target.value);
        },
        [errorMessage],
    );

    const confirmTemplateEdit = useCallback(
        (oldName: string) => (): void => {
            if (templates.some((template) => template.name === editedName)) {
                setErrorMessage('Duplicate name');
                return;
            }
            void dispatch(
                candidateActions.editMessageTemplate({
                    newName: editedName,
                    oldName,
                }),
            );
            setIsEdit(false);
        },
        [dispatch, editedName, templates],
    );

    const removeTemplate = useCallback(
        (templateName: string) => (): void => {
            void dispatch(candidateActions.removeMessageTemplate(templateName));
        },
        [dispatch],
    );

    return isEdit ? (
        <>
            <Grid container justifyContent={'space-between'}>
                <Input
                    className={getValidClassNames(
                        styles.button,
                        styles.templateButton,
                        styles.template,
                        styles.templateInput,
                        errorMessage && styles.templateError,
                    )}
                    placeholder="Template name"
                    control={control}
                    errors={errors}
                    name={name}
                    value={editedName}
                    onChange={handleNameChange}
                />
                <Grid className={styles.buttonsContainer}>
                    <Button
                        className={getValidClassNames(styles.button)}
                        label=""
                        onClick={confirmTemplateEdit(template.name)}
                        variant="outlined"
                        endIcon={<CheckIcon className={styles.buttonIcon} />}
                    />
                    <Button
                        className={getValidClassNames(styles.button)}
                        label=""
                        onClick={cancelTemplateEdit}
                        variant="outlined"
                        endIcon={<CloseIcon className={styles.buttonIcon} />}
                    />
                </Grid>
            </Grid>
            {errorMessage && (
                <FormHelperText className={styles.error}>
                    {errorMessage}
                </FormHelperText>
            )}
        </>
    ) : (
        <Grid container justifyContent={'space-between'}>
            <Button
                className={getValidClassNames(
                    styles.button,
                    styles.templateButton,
                    styles.template,
                )}
                onClick={applyTemplate(template.message)}
                variant="text"
                label={template.name}
            />
            <Grid className={styles.buttonsContainer}>
                <Button
                    className={getValidClassNames(styles.button)}
                    label=""
                    onClick={editTemplate}
                    variant="outlined"
                    endIcon={<EditIcon className={styles.buttonIcon} />}
                />
                <Button
                    className={getValidClassNames(styles.button)}
                    label=""
                    onClick={removeTemplate(template.name)}
                    variant="outlined"
                    endIcon={<DeleteIcon className={styles.buttonIcon} />}
                />
            </Grid>
        </Grid>
    );
};

export { MessageTemplate };
