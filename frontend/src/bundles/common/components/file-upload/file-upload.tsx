import { useRef } from 'react';

import { useCallback } from '../../hooks/hooks.js';
import { Button, type ButtonProperties } from '../components.js';

type Properties = {
    accept: string;
    buttonProps: Partial<ButtonProperties>;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => boolean;
};

const FileUpload: React.FC<Properties> = ({
    accept,
    buttonProps,
    onChange,
    ...props
}) => {
    const uploadReference = useRef<HTMLInputElement>(null);

    const handleButtonClick = useCallback((): void => {
        uploadReference.current?.click();
    }, [uploadReference]);

    return (
        <>
            <input
                {...props}
                type="file"
                accept={accept}
                ref={uploadReference}
                hidden
                onChange={onChange}
            />
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
