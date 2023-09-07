import { joiResolver } from '@hookform/resolvers/joi';
import {
    type Control,
    type DefaultValues,
    type FieldErrors,
    type FieldValues,
    type UseFormHandleSubmit,
    type UseFormSetError,
    type ValidationMode,
} from 'react-hook-form';
import { useForm } from 'react-hook-form';

import { type ValidationSchema } from '~/bundles/common/types/types';

type Arguments<T extends FieldValues = FieldValues> = {
    defaultValues: DefaultValues<T>;
    validationSchema?: ValidationSchema;
    mode?: keyof ValidationMode;
};

type Results<T extends FieldValues = FieldValues> = {
    control: Control<T, null>;
    errors: FieldErrors<T>;
    handleSubmit: UseFormHandleSubmit<T>;
    setError: UseFormSetError<T>;
};

const useAppForm = <T extends FieldValues = FieldValues>({
    defaultValues,
    mode,
    validationSchema,
}: Arguments<T>): Results<T> => {
    const {
        control,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm<T>({
        defaultValues,
        mode,
        resolver: validationSchema ? joiResolver(validationSchema) : undefined,
    });

    return {
        control,
        handleSubmit,
        errors,
        setError,
    };
};

export { useAppForm };
