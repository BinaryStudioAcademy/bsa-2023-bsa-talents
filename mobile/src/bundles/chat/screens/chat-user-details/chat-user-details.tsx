import React from 'react';

import { CompanyInfo } from '~/bundles/chat/components/components';

// TODO replace with real data
const companyInfo = {
    logoUrl: 'https://reactnative.dev/img/tiny_logo.png',
    companyName: 'Unicor Group',
    employerName: 'Oleg Purysh',
    employerPosition: 'Head of Recruitment',
    about: 'An IT company is a specialized organization that crafts and delivers technology-driven solutions. From software development and cybersecurity to cloud computing and digital consulting, these companies pave the way for businesses to thrive in the digital age.',
    companyWebsite: 'unicore-group.com',
};

const ChatUserDetails: React.FC = () => {
    return <CompanyInfo companyInfo={companyInfo} />;
};

export { ChatUserDetails };
