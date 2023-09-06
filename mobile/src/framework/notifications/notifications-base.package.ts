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

    private showMessage(
        type: 'error' | 'success',
        settings: ShowMessageArguments,
    ): void {
        const { title, text } = settings;
        this.notify.show({
            type,
            text1: title,
            text2: text,
        });
    }

    public showError(settings: ShowMessageArguments): void {
        this.showMessage('error', settings);
    }

    public showSuccess(settings: ShowMessageArguments): void {
        this.showMessage('success', settings);
    }
}

export { BaseNotifications };
