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
    useState,
} from '~/bundles/common/hooks/hooks.js';

const App: React.FC = () => {
    const dispatch = useAppDispatch();
    const { dataStatus } = useAppSelector(({ auth }) => ({
        dataStatus: auth.dataStatus,
    }));

    const [isUserFullfilled, setIsUserFullfilled] = useState(false);

    useEffect(() => {
        setIsUserFullfilled(
            dataStatus === 'fulfilled' || dataStatus == 'rejected',
        );
    }, [dataStatus]);

    useEffect(() => {
        void dispatch(authActions.loadUser());
    }, [dispatch]);

    return (
        <>
            {isUserFullfilled ? (
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
