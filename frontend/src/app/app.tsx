import reactLogo from '~/assets/img/react.svg';
import {
    CustomTypography,
    Link,
    RouterOutlet,
} from '~/bundles/common/components/components.js';
import { AppRoute } from '~/bundles/common/enums/enums.js';
import {
    useAppDispatch,
    useAppSelector,
    useEffect,
    useLocation
} from '~/bundles/common/hooks/hooks.js';
import { actions as userActions } from '~/bundles/users/store';

const App: React.FC = () => {
    const { pathname } = useLocation();
    const dispatch = useAppDispatch();
    const { users, dataStatus } = useAppSelector(({ users }) => ({
        users: users.users,
        dataStatus: users.dataStatus,
    }));

    const isRoot = pathname === AppRoute.ROOT;

    useEffect(() => {
        if (isRoot) {
            void dispatch(userActions.loadAll());
        }
    }, [isRoot, dispatch]);

    return (
        <>
            <img src={reactLogo} className="App-logo" width="30" alt="logo" />

            <ul className="App-navigation-list">
                <li>
                    <Link to={AppRoute.ROOT}>Root</Link>
                </li>
                <li>
                    <Link to={AppRoute.SIGN_IN}>Sign in</Link>
                </li>
                <li>
                    <Link to={AppRoute.SIGN_UP}>Sign up</Link>
                </li>
            </ul>
            <p>Current path: {pathname}</p>

            <div>
                <RouterOutlet />
            </div>
            {isRoot && (
                <>
                    <CustomTypography variant="h2">Users:</CustomTypography>
                    <CustomTypography variant="h3">
                        Status: {dataStatus}
                    </CustomTypography>
                    <ul>
                        {users.map((it) => (
                            <li key={it.id}>{it.email}</li>
                        ))}
                    </ul>
                </>
            )}
        </>
    );
};

export { App };
