import { IconButton, Input as MuiInput, InputAdornment } from '@mui/material';

import sendIcon from '~/assets/img/send-message.svg';
import { Grid } from '~/bundles/common/components/components.js';
import { getValidClassNames } from '~/bundles/common/helpers/helpers.js';
import { useCallback, useState } from '~/bundles/common/hooks/hooks.js';

import styles from './styles.module.scss';

type Properties = {
    onClick?: (message: string) => void;
    className?: string;
};

const MessageInput: React.FC<Properties> = ({ onClick, className }) => {
    const [message, setMessage] = useState('');
    const [isFocused, setIsFocused] = useState(false);

    const handleInputChange = useCallback(
        (
            event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        ): void => {
            setMessage(event.target.value);
        },
        [],
    );

    const handleSendClick = useCallback(() => {
        if (onClick && message.trim()) {
            onClick(message);
            setMessage('');
        }
    }, [message, onClick]);

    const handleFocus = useCallback(() => {
        setIsFocused(true);
    }, [setIsFocused]);

    const handleBlur = useCallback(() => {
        setIsFocused(false);
    }, [setIsFocused]);

    const inputStyles = getValidClassNames(
        styles.input,
        isFocused && styles.focused,
    );

    return (
        <Grid className={getValidClassNames(styles.wrapper, className)}>
            <MuiInput
                value={message}
                name="message"
                type="text"
                placeholder="Type a message"
                multiline={true}
                minRows={1}
                maxRows={7}
                className={inputStyles}
                onChange={handleInputChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                disableUnderline={true}
                endAdornment={
                    <InputAdornment position="end" className={styles.adornment}>
                        <IconButton
                            aria-label="send message"
                            onClick={handleSendClick}
                            edge="end"
                        >
                            <img src={sendIcon} alt="send" />
                        </IconButton>
                    </InputAdornment>
                }
            />
        </Grid>
    );
};

export { MessageInput };
