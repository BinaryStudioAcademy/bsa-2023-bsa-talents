import { Add as PlusIcon } from '@mui/icons-material';
import { useCallback, useState } from 'react';

import {
    Button,
    FormControl,
    FormLabel,
    Grid,
    Input,
    InputFile,
    Typography,
} from '~/bundles/common/components/components.js';
import { getValidClassNames } from '~/bundles/common/helpers/helpers.js';
import { useAppForm } from '~/bundles/common/hooks/hooks.js';
import { type UserSignUpStep4Dto } from '~/bundles/sign-up/types/types.js';
import { signUpStep4ValidationSchema } from '~/bundles/sign-up/validation-schemas/validation-schemas.js';

import {
    ACCEPTED_CV_TYPES,
    ACCEPTED_PHOTO_TYPES,
    DEFAULT_SIGN_UP_PAYLOAD_STEP4,
} from './constants/constants.js';
import styles from './styles.module.scss';

type Properties = {
    onSubmit: (payload: UserSignUpStep4Dto) => void;
};

const FourthStep: React.FC<Properties> = ({ onSubmit }) => {
    const [photoURL, setPhotoURL] = useState<string>('');

    const { control, errors, handleSubmit, watch, setError } = useAppForm({
        defaultValues: DEFAULT_SIGN_UP_PAYLOAD_STEP4,
        validationSchema: signUpStep4ValidationSchema,
    });

    const handleFormSubmit = useCallback(
        (event_: React.BaseSyntheticEvent): void => {
            void handleSubmit(onSubmit)(event_);
        },
        [handleSubmit, onSubmit],
    );

    return (
        <form className={styles.form} onSubmit={handleFormSubmit}>
            <Grid container className={styles.photo}>
                <Grid
                    item
                    className={styles.photoWrapper}
                    style={{
                        backgroundImage: `url(${photoURL})`,
                    }}
                ></Grid>
                <InputFile
                    control={control}
                    errors={errors}
                    setError={setError}
                    name="photo"
                    setUrl={setPhotoURL}
                    accept={ACCEPTED_PHOTO_TYPES.join(',')}
                    labelTitle="Upload a new photo"
                    buttonProps={{
                        label: 'Choose photo',
                        className: getValidClassNames(
                            styles.uploadPhotoBtn,
                            errors.photo?.message ? styles.btnError : '',
                        ),
                    }}
                />
            </Grid>

            <FormControl className={styles.formControl}>
                <FormLabel className={styles.label} required>
                    <Typography variant={'label'}>Full name</Typography>
                </FormLabel>

                <Input
                    control={control}
                    placeholder="Name"
                    type="text"
                    errors={errors}
                    name={'fullName'}
                />
            </FormControl>

            <FormControl className={styles.formControl}>
                <FormLabel className={styles.label} required>
                    <Typography variant={'label'}>Phone number</Typography>
                </FormLabel>

                <Input
                    control={control}
                    placeholder="+38000 000 00 00"
                    type="text"
                    errors={errors}
                    name={'phoneNumber'}
                />
            </FormControl>

            <FormControl className={styles.formControl}>
                <FormLabel className={styles.label} required>
                    <Typography variant={'label'}>LinkedIn profile</Typography>
                </FormLabel>

                <Input
                    control={control}
                    placeholder="link to your LinkedIn"
                    type="text"
                    errors={errors}
                    name={'linkedInLink'}
                    adornmentText="www"
                />
            </FormControl>
            <InputFile
                control={control}
                errors={errors}
                setError={setError}
                name="cv"
                accept={ACCEPTED_CV_TYPES.join(',')}
                required
                labelTitle="CV"
                buttonProps={{
                    label: 'Choose file',
                    className: getValidClassNames(
                        styles.uploadCVBtn,
                        errors.cv?.message ? styles.btnError : '',
                    ),
                    startIcon: <PlusIcon />,
                }}
            />

            <Typography variant="caption">
                {watch('cv') ? `Attached file: ${watch('cv')?.name}` : ''}
            </Typography>

            <Typography variant="caption" className={styles.info}>
                Job search is anonymous. This information will be seen only in
                case you share it.
            </Typography>

            <Grid className={styles.formButtons}>
                <Button
                    label="Back"
                    variant="outlined"
                    type="button"
                    className={styles.btnBack}
                />
                <Button
                    label="Next"
                    variant="contained"
                    type="submit"
                    className={styles.btnBext}
                />
            </Grid>
        </form>
    );
};

export { FourthStep };
