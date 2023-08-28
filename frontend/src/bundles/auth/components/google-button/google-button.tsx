import GoogleIcon from '~/assets/img/google-icon.svg';
import { Button } from '~/bundles/common/components/components.js';

import styles from './styles.module.scss';

const Icon = (): React.ReactElement => (
    <img src={GoogleIcon} alt="Google Icon" />
);

const GoogleButton = (): React.ReactElement => {
    return (
        <Button
            className={styles['google-button']}
            label="Continue with Google"
            startIcon={<Icon />}
            variant="outlined"
        />
    );
};

export { GoogleButton };
