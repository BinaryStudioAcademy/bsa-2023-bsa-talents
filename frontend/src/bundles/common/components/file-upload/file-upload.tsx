import { useCallback, useRef } from 'react';
import {
    type Control,
    type FieldPath,
    type FieldValues,
} from 'react-hook-form';
import { Controller } from 'react-hook-form';

import { useFormController } from '../../hooks/hooks.js';
import { Button, type ButtonProperties } from '../components.js';

type Properties<T extends FieldValues> = {
    control: Control<T, null>;
    name: FieldPath<T>;
    accept: string;
    buttonProps: Partial<ButtonProperties>;
    handleFileChange: (file: File) => boolean;
};

const FileUpload = <T extends FieldValues>({
    control,
    name,
    accept,
    buttonProps,
    handleFileChange,
}: Properties<T>): JSX.Element => {
    const uploadReference = useRef<HTMLInputElement>(null);

    const { field } = useFormController({ name, control });

    const onChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>): void => {
            if (!event.target.files) {
                return;
            }

            const [file] = [...event.target.files];

            const validInput = handleFileChange(file);

            if (validInput) {
                field.onChange(file);
            }
        },
        [field, handleFileChange],
    );

    const renderInput = useCallback(
        (): JSX.Element => (
            <input
                type="file"
                accept={accept}
                ref={uploadReference}
                hidden
                onChange={onChange}
            />
        ),
        [accept, onChange],
    );

    const handleButtonClick = useCallback((): void => {
        uploadReference.current?.click();
    }, []);

    return (
        <>
            <Controller name={name} control={control} render={renderInput} />
            <Button
                {...buttonProps}
                variant="outlined"
                component="span"
                label={buttonProps.label ?? 'Choose file'}
                onClick={handleButtonClick}
            />
        </>
    );
};

export { FileUpload };
