import Toast from 'react-native-toast-message';

import {
    type Notification,
    type ShowMessageArguments,
} from '~/framework/notifications/types/types';

class BaseNotifications implements Notification {
    private notify: typeof Toast;

    public constructor() {
        this.notify = Toast;
    }

    public showError(settings: ShowMessageArguments): void {
        this.notify.show({
            type: 'error',
            ...settings,
        });
    }

    public showSuccess(settings: ShowMessageArguments): void {
        this.notify.show({
            type: 'success',
            ...settings,
        });
    }
}

export { BaseNotifications };
