import { useCallback, useEffect, useRef, useState } from 'react';
import {
    type Control,
    type FieldErrors,
    type FieldPath,
    type FieldValues,
    type UseFormSetError,
} from 'react-hook-form';
import { Controller } from 'react-hook-form';

import { MAX_FILE_SIZE } from '~/bundles/sign-up/components/fourth-step/constants/constants.js';

import { useFormController } from '../../hooks/hooks.js';
import { type ButtonProperties } from '../button/button.js';
import { Button, FormControl, FormLabel, Typography } from '../components.js';
import styles from './styles.module.scss';

type Properties<T extends FieldValues> = {
    control: Control<T, null>;
    errors: FieldErrors<T>;
    name: FieldPath<T>;
    accept: string;
    setError: UseFormSetError<T>;
    setUrl?: React.Dispatch<React.SetStateAction<string>>;
    required?: boolean;
    labelTitle: string;
    buttonProps: Partial<ButtonProperties>;
};

const InputFile = <T extends FieldValues>({
    control,
    errors,
    name,
    accept,
    setError,
    setUrl,
    required,
    labelTitle,
    buttonProps,
}: Properties<T>): JSX.Element => {
    const [link, setLink] = useState<string>('');
    const uploadReference = useRef<HTMLInputElement>(null);

    const { field } = useFormController({ name, control });
    const errorMessage = String(errors[name]?.message);
    const errorType = String(errors[name]?.type);

    const handleInputChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>): void => {
            if (!event.target.files) {
                return;
            }
            const [file] = [...event.target.files];
            if (file.size <= MAX_FILE_SIZE.bytes) {
                field.onChange(file);
                if (setUrl) {
                    const url = URL.createObjectURL(file);
                    setLink(url);
                    setUrl(url);
                }
            } else {
                setError(name, {
                    message: `Please upload a ${name} smaller than ${MAX_FILE_SIZE.mb} MB.`,
                    type: 'fileSize',
                });
            }
        },
        [field, name, setError, setUrl],
    );

    const renderInput = useCallback(
        (): JSX.Element => (
            <input
                type="file"
                accept={accept}
                ref={uploadReference}
                hidden
                onChange={handleInputChange}
            />
        ),
        [accept, handleInputChange],
    );

    const handleButtonClick = useCallback((): void => {
        uploadReference.current?.click();
    }, []);

    useEffect(() => {
        return () => {
            URL.revokeObjectURL(link);
        };
    }, [link]);

    return (
        <FormControl className={styles.formControl}>
            <FormLabel className={styles.label} required={required}>
                <Typography variant="label">{labelTitle}</Typography>
            </FormLabel>
            <Controller name={name} control={control} render={renderInput} />
            <Button
                {...buttonProps}
                variant="outlined"
                component="span"
                label={buttonProps.label ?? 'Choose file'}
                onClick={handleButtonClick}
            />
            <Typography
                variant="caption"
                color="error"
                className={styles.photoError}
            >
                {errorType === 'fileSize' && errorMessage}
            </Typography>
        </FormControl>
    );
};

export { InputFile };
