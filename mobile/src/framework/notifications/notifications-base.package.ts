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
        const { title, text } = settings;
        this.notify.show({
            type: 'error',
            text1: title,
            text2: text,
        });
    }

    public showSuccess(settings: ShowMessageArguments): void {
        const { title, text } = settings;
        this.notify.show({
            type: 'success',
            text1: title,
            text2: text,
        });
    }
}

export { BaseNotifications };
