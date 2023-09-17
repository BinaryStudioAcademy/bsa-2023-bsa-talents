import { joiResolver } from '@hookform/resolvers/joi';

import { useForm } from '~/bundles/common/hooks/hooks';
import {
    type Control,
    type DefaultValues,
    type FieldErrors,
    type FieldValues,
    type UseFormGetValues,
    type UseFormHandleSubmit,
    type UseFormResetField,
    type UseFormSetError,
    type UseFormSetValue,
    type ValidationMode,
    type ValidationSchema,
} from '~/bundles/common/types/types';

type Arguments<T extends FieldValues = FieldValues> = {
    defaultValues: DefaultValues<T>;
    validationSchema?: ValidationSchema;
    mode?: keyof ValidationMode;
};

type Results<T extends FieldValues = FieldValues> = {
    control: Control<T, null>;
    errors: FieldErrors<T>;
    handleSubmit: UseFormHandleSubmit<T>;
    setValue: UseFormSetValue<T>;
    getValues: UseFormGetValues<T>;
    resetField: UseFormResetField<T>;
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
        setValue,
        getValues,
        resetField,
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
        setValue,
        getValues,
        resetField,
        setError,
    };
};

export { useAppForm };
