import {
    Notifications,
    PageLayout,
    RouterOutlet,
} from '~/bundles/common/components/components.js';

const App: React.FC = () => {
    return (
        <>
            <PageLayout avatarUrl="" isOnline>
                <RouterOutlet />
            </PageLayout>
            <Notifications />
        </>
    );
};

export { App };
