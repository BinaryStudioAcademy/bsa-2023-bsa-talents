import {
    actions as authActions,
    type State,
} from '~/bundles/auth/store/auth.js';
import {
    Loader,
    Notifications,
    RouterOutlet,
} from '~/bundles/common/components/components.js';
import { DataStatus } from '~/bundles/common/enums/enums.js';
import {
    useAppDispatch,
    useAppSelector,
    useEffect,
} from '~/bundles/common/hooks/hooks.js';
import { type RootReducer } from '~/framework/store/store.js';

const getAuthState = (state: RootReducer): State => state.auth;

const App: React.FC = () => {
    const dispatch = useAppDispatch();
    const dataStatus = useAppSelector(
        (rootState) => getAuthState(rootState).dataStatus,
    );

    const token = localStorage.getItem('token');
    useEffect(() => {
        void dispatch(authActions.loadUser());
    }, [dispatch, token]);

    if (dataStatus === DataStatus.PENDING) {
        return <Loader />;
    }

    return (
        <>
            <RouterOutlet />
            <Notifications />
        </>
    );
};

export { App };
