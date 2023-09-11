import {
    Button,
    type ButtonProperties,
} from '~/bundles/common/components/components.js';
import { useCallback,useRef } from '~/bundles/common/hooks/hooks.js';

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
