import { Dropdown, type DropdownProps } from '@mui/base/Dropdown';

import { getValidClassNames } from '~/bundles/common/helpers/helpers.js';

type Properties = DropdownProps & { className?: string };

const CustomDropdown: React.FC<Properties> = ({
    children,
    className,
    ...props
}) => {
    return (
        <div className={getValidClassNames(className)}>
            <Dropdown {...props}>{children}</Dropdown>
        </div>
    );
};

export { type Properties as DropdownProps };
export { CustomDropdown as Dropdown };
