import sgMail from '@sendgrid/mail';

import { config } from '~/common/packages/packages.js';

class EmailService {
    public constructor() {
        sgMail.setApiKey(config.ENV.SEND_GRID.MAIL_API_KEY);
    }

    public async sendForgotPasswordEmail(
        email: string,
        resetToken: string,
    ): Promise<void> {
        const link = `${config.ENV.SEND_GRID.CLIENT_URL}/reset-password/${resetToken}`;

        const message = {
            to: email,
            from: config.ENV.SEND_GRID.MAIL_SENDER_DOMAIN,
            subject: 'Reset Password',
            html: `Hello! You requested to reset your password. <a href="${link}">Click here</a> to reset your password.`,
        };

        await sgMail.send(message);
    }
}

export { EmailService };
