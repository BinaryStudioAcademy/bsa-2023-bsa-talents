import { NavLink } from 'react-router-dom';

import { type AppRoute } from '~/bundles/common/enums/enums.js';
import { type ValueOf } from '~/bundles/common/types/types.js';

type RoutePattern<T extends string> = T extends `${infer Start}:${string}`
    ? `${Start}${string}`
    : T;

type Properties = {
    to: RoutePattern<ValueOf<typeof AppRoute>>;
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
