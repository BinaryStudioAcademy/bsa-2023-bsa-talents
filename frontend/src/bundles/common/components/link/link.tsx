import { NavLink } from 'react-router-dom';

type Properties = {
    to: string;
    children: React.ReactNode;
    className?:
        | string
        | ((props: {
              isActive: boolean;
              isPending: boolean;
          }) => string | undefined)
        | undefined;
};

const Link: React.FC<Properties> = ({ children, to, className }) => (
    <NavLink to={to} className={className}>
        {children}
    </NavLink>
);

export { Link };
