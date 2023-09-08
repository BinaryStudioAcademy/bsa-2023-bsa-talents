// import {
//     // type Control,
//     // type FieldErrors,
//     // type FieldValues,
//     // useFieldArray,
// } from 'react-hook-form';

// import { Input } from '~/bundles/common/components/components.js';
import {
    useAppDispatch,
    useAppForm,
    useAppSelector,
    useCallback,
    // useState,
} from '~/bundles/common/hooks/hooks.js';

import { actions as candidateActions } from '../../store/candidate.js';
// import { type MessageTemplateDto } from '../../types/types.js';
import { TemplateItem } from '../components.js';
// import styles from './styles.module.scss';

type Properties = {
    // templates: MessageTemplateDto[];
    applyTemplate: (message: string) => () => void;
};

const TemplateList = ({
    // templates,
    applyTemplate,
}: Properties): JSX.Element => {
    const dispatch = useAppDispatch();
    // const [isEdit, setIsEdit] = useState(false);

    const { messageTemplates } = useAppSelector(({ candidate }) => ({
        messageTemplates: candidate.messageTemplates,
    }));

    const {
        control,
        errors,
        // handleSubmit,
        // setValue
    } = useAppForm({
        defaultValues: { templates: messageTemplates },
    });

    // const { fields, append, remove } = useFieldArray({
    //     name: 'templates',
    //     control,
    // });

    const removeTemplate = useCallback(
        (templateName: string) => (): void => {
            void dispatch(candidateActions.removeMessageTemplate(templateName));
        },
        [dispatch],
    );
    // const editTemplate = useCallback(() => {
    //     setIsEdit(true);
    // }, []);

    // const confirmTemplateEdit = useCallback(
    //     (oldName: string) => (): void => {
    //         dispatch(
    //             candidateActions.editMessageTemplate({
    //                 newName: 'New name',
    //                 oldName,
    //             }),
    //         );
    //         setIsEdit(false);
    //     },
    //     [dispatch],
    // );

    return (
        <>
            {messageTemplates.map((template, index) => {
                return (
                    <TemplateItem
                        key={template.name}
                        template={template}
                        templates={messageTemplates}
                        applyTemplate={applyTemplate}
                        control={control}
                        errors={errors}
                        name={`templates.${index}.name`}
                        removeTemplate={removeTemplate}
                    />
                );
            })}
        </>
    );
};

export { TemplateList };
