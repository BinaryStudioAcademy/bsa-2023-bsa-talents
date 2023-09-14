import { InfoOutlined } from '@mui/icons-material';

import {
    SmallScreenButton,
    type SmallScreenButtonProperties,
} from './small-screen-button.js';

const ChatInfoIcon: React.FC<SmallScreenButtonProperties> = (props) => {
    return (
        <SmallScreenButton {...props}>
            <InfoOutlined fontSize="large" />
        </SmallScreenButton>
    );
};

export { ChatInfoIcon };
