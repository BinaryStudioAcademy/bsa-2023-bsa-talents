import Toast from 'react-native-toast-message';

import { type Notification } from '~/framework/notifications/types/types';

class BaseNotifications implements Notification {
    private notify: typeof Toast;

    public constructor() {
        this.notify = Toast;
    }

    public showError(value: string): void {
        this.notify.show({
            type: 'error',
            text1: value,
        });
    }

    public showSuccess(value: string): void {
        this.notify.show({
            type: 'success',
            text1: value,
        });
    }
}

export { BaseNotifications };
