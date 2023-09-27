import sgMail from '@sendgrid/mail';

import { config } from '~/common/packages/packages.js';

class EmailService {
    private APIKey: string;
    private clientUrl: string;
    private mailSenderDomain: string;

    public constructor() {
        this.APIKey = config.ENV.SEND_GRID.MAIL_API_KEY;
        this.clientUrl = config.ENV.SEND_GRID.CLIENT_URL;
        this.mailSenderDomain = config.ENV.SEND_GRID.MAIL_SENDER_DOMAIN;

        sgMail.setApiKey(this.APIKey);
    }

    public async sendForgotPasswordEmail(
        email: string,
        resetToken: string,
    ): Promise<void> {
        const link = `${this.clientUrl}/reset-password/${resetToken}`;

        const message = {
            to: email,
            from: this.mailSenderDomain,
            subject: 'Reset Password',
            html: `Hello! You requested to reset your password. <a href="${link}">Click here</a> to reset your password.`,
        };

        await sgMail.send(message);
    }

    public async sendAccountApprovalEmail(email: string): Promise<void> {
        const message = {
            to: email,
            from: this.mailSenderDomain,
            subject: 'Account verification',
            text: 'Hello! Your account on bsa-talents.com has been approved',
        };

        await sgMail.send(message);
    }

    public async sendAccountDenialEmail(
        email: string,
        deniedReason: string,
    ): Promise<void> {
        const message = {
            to: email,
            from: this.mailSenderDomain,
            subject: 'Account verification',
            text: `Hello! Your account on bsa-talents.com has been denied - ${deniedReason}`,
        };

        await sgMail.send(message);
    }
}

export { EmailService };
