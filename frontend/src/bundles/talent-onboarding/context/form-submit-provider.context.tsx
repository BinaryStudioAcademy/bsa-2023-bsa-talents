import { createContext } from 'react';

import { useContext, useState } from '~/bundles/common/hooks/hooks.js';

type FormSubmitContextType = {
    submitForm: (() => Promise<boolean>) | null;
    setSubmitForm: React.Dispatch<
        React.SetStateAction<(() => Promise<boolean>) | null>
    >;
};

type ProviderProperties = {
    children?: React.ReactNode;
};

const FormSubmitContext = createContext<FormSubmitContextType | null>(null);

// Custom hook to use the context
const useFormSubmit = (): FormSubmitContextType => {
    const context = useContext(FormSubmitContext);
    if (!context) {
        throw new Error(
            'useFormSubmit must be used within a FormSubmitProvider',
        );
    }
    return context;
};

const FormSubmitProvider: React.FC<ProviderProperties> = ({ children }) => {
    const [submitForm, setSubmitForm] = useState<
        (() => Promise<boolean>) | null
    >(null);
    return (
        <FormSubmitContext.Provider value={{ submitForm, setSubmitForm }}>
            {children}
        </FormSubmitContext.Provider>
    );
};

export {
    FormSubmitContext,
    type FormSubmitContextType,
    FormSubmitProvider,
    useFormSubmit,
};
