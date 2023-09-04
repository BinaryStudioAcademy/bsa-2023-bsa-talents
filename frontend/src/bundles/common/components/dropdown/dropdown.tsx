import { Dropdown, type DropdownProps } from '@mui/base/Dropdown';

type Properties = DropdownProps;

const CustomDropdown: React.FC<Properties> = ({ children, ...props }) => {
    return (
        <div>
            <Dropdown {...props}>{children}</Dropdown>
        </div>
    );
};

export { type Properties as DropdownProps };
export { CustomDropdown as Dropdown };
