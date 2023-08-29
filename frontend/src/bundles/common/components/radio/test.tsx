import { useForm } from 'react-hook-form';

import { RadioGroup } from '~/bundles/common/components/components.js';

type Properties = {
    test?: true;
};
const TestR: React.FC<Properties> = () => {
    const { control } = useForm();
    return (
        <RadioGroup
            control={control}
            name="english"
            options={[
                { value: 'A1', label: 'A1' },
                { value: 'A2', label: 'A2' },
                { value: 'B1', label: 'B1' },
                { value: 'B2', label: 'B2' },
                { value: 'C1', label: 'C1' },
                { value: 'C2', label: 'C2' },
            ]}
        />
    );
};

export { TestR };
