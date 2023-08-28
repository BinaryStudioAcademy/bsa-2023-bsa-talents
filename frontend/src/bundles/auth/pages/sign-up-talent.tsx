import { Header, Sidebar } from '../../common/components/components.js';
import { SignUpContent } from '../components/components.js';

type Properties = {
    avatarUrl: string;
    isOnline: boolean;
    stepContent: React.ReactNode;
};

const SignUpTalent: React.FC<Properties> = ({
    avatarUrl,
    isOnline,
    stepContent,
}) => {
    return (
        <>
            <Header avatarUrl={avatarUrl} isOnline={isOnline} />
            <Sidebar />
            <SignUpContent stepContent={stepContent} />
        </>
    );
};

export { SignUpTalent };
