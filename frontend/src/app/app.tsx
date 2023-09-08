import { actions as authActions } from '~/bundles/auth/store/auth.js';
import {
    Loader,
    Notifications,
    PageLayout,
    RouterOutlet,
} from '~/bundles/common/components/components.js';
import { DataStatus } from '~/bundles/common/enums/enums.js';
import {
    useAppDispatch,
    useAppSelector,
    useEffect,
} from '~/bundles/common/hooks/hooks.js';

const App: React.FC = () => {
    const dispatch = useAppDispatch();
    const { dataStatus } = useAppSelector(({ auth }) => ({
        dataStatus: auth.dataStatus,
    }));

    useEffect(() => {
        void dispatch(authActions.loadUser());
    }, [dispatch]);

    return (
        <>
            {dataStatus !== DataStatus.FULFILLED &&
            dataStatus !== DataStatus.REJECTED ? (
                <Loader />
            ) : (
                <PageLayout avatarUrl="" isOnline>
                    <RouterOutlet />
                </PageLayout>
            )}
            <Notifications />
        </>
    );
};

export { App };
