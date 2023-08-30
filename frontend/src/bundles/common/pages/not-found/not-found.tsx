import { NotFound, PageLayout } from '../../components/components.js';

type Properties = {
    avatarUrl: string;
    isOnline: boolean;
};

const NotFoundPage: React.FC<Properties> = ({ avatarUrl, isOnline }) => (
    <PageLayout avatarUrl={avatarUrl} isOnline={isOnline}>
        <NotFound />
        <NotFound />
        <NotFound />
        <NotFound />
    </PageLayout>
);

export { NotFoundPage };
