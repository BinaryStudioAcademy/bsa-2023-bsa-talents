import { PersonSearch } from '@mui/icons-material';

import {
    SmallScreenButton,
    type SmallScreenButtonProperties,
} from './small-screen-button.js';

const ChatListIcon: React.FC<SmallScreenButtonProperties> = (props) => {
    return (
        <SmallScreenButton {...props}>
            <PersonSearch fontSize="large" />
        </SmallScreenButton>
    );
};

export { ChatListIcon };
