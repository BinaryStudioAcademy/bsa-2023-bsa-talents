import React from 'react';

import { FormField } from '~/bundles/common/components/components';
import { globalStyles } from '~/bundles/common/styles/styles';
import { type Control, type FieldErrors } from '~/bundles/common/types/types';
import { type BsaBadgesStepTypes } from '~/bundles/talent/types/types';

import { BadgesGroup } from './badges-group/badges-group';

type Properties = {
    control: Control<BsaBadgesStepTypes>;
    errors: FieldErrors<BsaBadgesStepTypes>;
    isEditable: boolean;
};

const BadgesFormData: React.FC<Properties> = ({
    control,
    errors,
    isEditable,
}) => {
    return (
        <FormField
            errorMessage={errors.badges?.message}
            name="badges"
            required
            containerStyle={globalStyles.pb25}
        >
            <BadgesGroup
                name="badges"
                control={control}
                isDisabled={!isEditable}
            />
        </FormField>
    );
};

export { BadgesFormData };
