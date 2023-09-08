import { PageLayout } from '~/bundles/common/components/components.js';

import { EmployeeFilters } from '../components/components.js';

const Candidates: React.FC = () => {
    return (
        <PageLayout
            isOnline={true}
            avatarUrl="https://static.vecteezy.com/system/resources/previews/016/274/193/large_2x/eurasian-lynx-in-winter-free-photo.jpg"
        >
            <EmployeeFilters />
        </PageLayout>
    );
};

export { Candidates };
