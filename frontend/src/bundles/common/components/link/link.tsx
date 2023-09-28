import { NavLink } from 'react-router-dom';

import { type ApplicationRoute } from '~/bundles/common/types/types.js';

type Properties = {
    to: ApplicationRoute;
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
