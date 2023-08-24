import { toast } from 'react-toastify';

type Message = string | undefined;

class NotificationService {
    public info(message: Message): void {
        toast.info(message, { toastId: message });
    }
    public success(message: Message): void {
        toast.success(message, { toastId: message });
    }
    public warn(message: Message): void {
        toast.warn(message, { toastId: message });
    }
    public error(message: Message): void {
        toast.error(message, { toastId: message });
    }
}

const notificationService = new NotificationService();

export { notificationService };
