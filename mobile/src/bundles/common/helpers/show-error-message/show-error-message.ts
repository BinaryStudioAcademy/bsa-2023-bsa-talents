import { notifications } from '~/framework/notifications/notifications';
import { ErrorMessages } from '../../enums/enums';

const showErrorMessage = (error: unknown) => {
    if (error instanceof Error) {
        notifications.showError(error.message);
        throw error;
    }
    notifications.showError(ErrorMessages.UNKNOWN_ERROR);
    throw error;
};

export { showErrorMessage };
