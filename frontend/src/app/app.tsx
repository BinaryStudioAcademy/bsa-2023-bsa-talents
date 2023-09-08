import { actions as authActions } from '~/bundles/auth/store/auth.js';
import {
    Loader,
    Notifications,
    PageLayout,
    RouterOutlet,
} from '~/bundles/common/components/components.js';
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
            {dataStatus == 'fulfilled' || dataStatus == 'rejected' ? (
                <PageLayout avatarUrl="" isOnline>
                    <RouterOutlet />
                </PageLayout>
            ) : (
                <Loader />
            )}
            <Notifications />
        </>
    );
};

export { App };
