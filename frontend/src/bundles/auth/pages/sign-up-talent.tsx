import { Header, Sidebar } from '../../common/components/components.js';
import { SignUpContent } from '../components/components.js';

type Properties = {
    avatarUrl: string;
    isOnline: boolean;
};

const SignUpTalent: React.FC<Properties> = ({ avatarUrl, isOnline }) => {
    return (
        <>
            <Header avatarUrl={avatarUrl} isOnline={isOnline} />
            <Sidebar />
            <SignUpContent />
        </>
    );
};

export { SignUpTalent };
