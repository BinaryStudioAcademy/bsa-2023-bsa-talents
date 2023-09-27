import React from 'react';

import { CompanyInfo } from '~/bundles/chat/components/components';
import { useAppSelector } from '~/bundles/common/hooks/hooks';

const ChatUserDetails: React.FC = () => {
    const { employerDetails } = useAppSelector(({ chat }) => chat.current);
    return <CompanyInfo companyInfo={employerDetails} />;
};

export { ChatUserDetails };
