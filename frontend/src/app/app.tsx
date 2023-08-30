import reactLogo from '~/assets/img/react.svg';
import {
    Header,
    Link,
    Notifications,
    RouterOutlet,
    Sidebar,
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
            {/* add condition if on current page we don`t need header and sidebar - hide them */}
            <Header avatarUrl="" isOnline />
            <Sidebar />
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
                <li>
                    <Link to={AppRoute.SIGN_UP_TALENT}>Sign up Talent</Link>
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
