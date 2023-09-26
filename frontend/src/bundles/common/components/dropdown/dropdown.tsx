import { Dropdown, type DropdownProps } from '@mui/base/Dropdown';

type Properties = DropdownProps & { className?: string };

const CustomDropdown: React.FC<Properties> = ({
    children,
    className,
    ...props
}) => {
    return (
        <Dropdown className={className} {...props}>
            {children}
        </Dropdown>
    );
};

export { type Properties as DropdownProps };
export { CustomDropdown as Dropdown };
