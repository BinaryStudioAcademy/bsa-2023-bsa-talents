import { type Control } from 'react-hook-form';

import { type Company } from '~/bundles/chat/types/types.js';
import {
    Button,
    FormControl,
    Grid,
    RadioGroup,
    Typography,
} from '~/bundles/common/components/components.js';

import styles from '../styles.module.scss';

type Properties = {
    company?: Company | Record<string, never>;
    aboutInfo: string;
    onHireSubmit: () => void;
    onShareCVButtonClick: () => void;
    talentIsHired: boolean;
    control: Control<{ hire: 'Yes' | 'No' }, null>;
    hasSharedContacts: boolean;
};

const CompanyEmployer: React.FC<Properties> = ({
    company,
    aboutInfo,
    onHireSubmit,
    onShareCVButtonClick,
    talentIsHired,
    control,
    hasSharedContacts,
}) => {
    const options = [
        {
            value: 'Yes',
            label: 'Yes',
        },
        {
            value: 'No',
            label: 'No',
        },
    ];
    return (
        <Grid className={styles.contentWrapper}>
            <Grid className={styles.content}>
                <Typography className={styles.contentHeading} variant="h6">
                    About {company?.companyName}
                </Typography>
                <Typography className={styles.about} variant="body1">
                    {aboutInfo}
                </Typography>
                {company?.companyWebsite && (
                    <>
                        <Typography
                            className={styles.contentHeading}
                            variant="h6"
                        >
                            Company Website
                        </Typography>
                        <Typography
                            variant="body1"
                            className={styles.linkWrapper}
                        >
                            <a
                                href={
                                    company.companyWebsite.startsWith(
                                        'http://',
                                    ) ||
                                    company.companyWebsite.startsWith(
                                        'https://',
                                    )
                                        ? company.companyWebsite
                                        : `http://${company.companyWebsite}`
                                }
                                rel="noreferrer"
                                target="_blank"
                                className={styles.companyLink}
                            >
                                {company.companyWebsite}
                            </a>
                        </Typography>
                    </>
                )}
            </Grid>

            <Grid className={styles.buttons}>
                <Button
                    className={styles.mainBtn}
                    label="Share your contact and CV"
                    onClick={onShareCVButtonClick}
                    isDisabled={hasSharedContacts}
                />
                <FormControl className={styles.hireCandidates}>
                    {!talentIsHired && (
                        <>
                            <Typography
                                variant="label"
                                className={styles.hireRadioLabel}
                            >
                                Has the company hired you?
                            </Typography>
                            <RadioGroup
                                control={control}
                                options={options}
                                name={'hire'}
                                className={styles.radio}
                            />
                        </>
                    )}
                    {talentIsHired && (
                        <Typography
                            variant="label"
                            className={styles.hiredLabel}
                        >
                            You have been hired by this company
                        </Typography>
                    )}
                    <Button
                        label="Submit"
                        className={styles.mainBtn}
                        onClick={onHireSubmit}
                        isDisabled={talentIsHired}
                    />
                </FormControl>
            </Grid>
        </Grid>
    );
};

export { CompanyEmployer };
