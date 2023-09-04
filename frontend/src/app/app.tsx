import reactLogo from '~/assets/img/react.svg';
import { actions as authActions } from '~/bundles/auth/store/auth.js';
import {
    Link,
    Notifications,
    RouterOutlet,
    Typography,
} from '~/bundles/common/components/components.js';
import { AppRoute } from '~/bundles/common/enums/enums.js';
import {
    useAppDispatch,
    useAppSelector,
    useEffect,
    useLocation,
} from '~/bundles/common/hooks/hooks.js';
import { actions as userActions } from '~/bundles/users/store/users.js';
import { StorageKey } from '~/framework/storage/storage.js';

const App: React.FC = () => {
    const { pathname } = useLocation();
    const dispatch = useAppDispatch();
    const { users, dataStatus, currentUser } = useAppSelector(
        ({ users, auth }) => ({
            users: users.users,
            dataStatus: users.dataStatus,
            currentUser: auth.currentUser,
        }),
    );

    const isRoot = pathname === AppRoute.ROOT;

    useEffect(() => {
        if (isRoot) {
            void dispatch(userActions.loadAll());
        }
    }, [isRoot, dispatch]);

    const token = localStorage.getItem(StorageKey.TOKEN);

    useEffect(() => {
        if (token) {
            void dispatch(authActions.loadUser());
        }
    }, [dispatch, token]);

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
                    <Typography variant="h2">Users:</Typography>
                    <Typography variant="h3">Status: {dataStatus}</Typography>
                    <br />
                    {currentUser && (
                        <>
                            <Typography variant="h2">
                                User id: {currentUser.id}
                            </Typography>
                            <Typography variant="h3">
                                User email: {currentUser.email}
                            </Typography>
                        </>
                    )}
                    <ul>
                        {users.map((it) => (
                            <li key={it.id}>{it.email}</li>
                        ))}
                    </ul>
                </>
            )}

            <Notifications />
        </>
    );
};

export { App };
