import { Dropdown, type DropdownProps } from '@mui/base/Dropdown';

type Properties = DropdownProps;

const CustomDropdown: React.FC<Properties> = ({ children, ...props }) => {
    return <Dropdown {...props}>{children}</Dropdown>;
};

export { type Properties as DropdownProps };
export { CustomDropdown as Dropdown };
