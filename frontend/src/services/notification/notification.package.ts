import { toast, type ToastOptions } from 'react-toastify';

import { NotificationType } from './enums/notification-type.enum.js';

type Message = string | undefined;

class Notification {
    private show(message: Message, parameters: ToastOptions): void {
        toast(message, parameters);
    }

    public [NotificationType.INFO] = (message: Message): void => {
        this.show(message, { type: 'info' });
    };
    public [NotificationType.SUCCESS] = (message: Message): void => {
        this.show(message, { type: 'success' });
    };
    public [NotificationType.WARNING] = (message: Message): void => {
        this.show(message, { type: 'warning' });
    };
    public [NotificationType.ERROR] = (message: Message): void => {
        this.show(message, { type: 'error' });
    };
}

export { Notification };
