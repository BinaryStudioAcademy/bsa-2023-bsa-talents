import reactLogo from '~/assets/img/react.svg';
import {
    Link,
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
    const { users, dataStatus, currentUser } = useAppSelector(({ users }) => ({
        users: users.users,
        dataStatus: users.dataStatus,
        currentUser: users.currentUser,
    }));

    const isRoot = pathname === AppRoute.ROOT;

    useEffect(() => {
        if (isRoot) {
            void dispatch(userActions.loadAll());
        }
    }, [isRoot, dispatch]);

    const token = localStorage.getItem(StorageKey.TOKEN);

    useEffect(() => {
        if (token) {
            void dispatch(userActions.loadUser());
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
                    {currentUser.email && (
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
        </>
    );
};

export { App };
