// FormControl, FormControlLabel, RadioGroup
import {
    FormControl,
    FormLabel,
    RadioGroup,
} from '~/bundles/common/components/components.js';

import { useAppForm } from '../../hooks/hooks.js';

type Properties = {
    test?: true;
};
const TestR: React.FC<Properties> = () => {
    const { control } = useAppForm({
        defaultValues: {
            'radio-buttons-group': 'female',
        },
    });

    return (
        <>
            <FormControl>
                <FormLabel id="demo-radio-buttons-group-label">
                    Gender
                </FormLabel>
                <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    name="radio-buttons-group"
                    control={control}
                    options={[
                        { value: 'A1', label: 'A1' },
                        { value: 'A2', label: 'A2' },
                        { value: 'B1', label: 'B1' },
                        { value: 'B2', label: 'B2' },
                        { value: 'C1', label: 'C1' },
                        { value: 'C2', label: 'C2' },
                    ]}
                />
            </FormControl>
        </>
    );
};

export { TestR };
