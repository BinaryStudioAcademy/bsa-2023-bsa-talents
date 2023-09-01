/* eslint-disable react/jsx-no-bind */
import { Add as PlusIcon } from '@mui/icons-material';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Controller } from 'react-hook-form';

import {
    Button,
    FormControl,
    FormLabel,
    Grid,
    Input,
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
    MAX_FILE_SIZE,
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

    const uploadPhotoReference = useRef<HTMLInputElement>(null);
    const uploadCVReference = useRef<HTMLInputElement>(null);

    const handleFormSubmit = useCallback(
        (event_: React.BaseSyntheticEvent): void => {
            void handleSubmit(onSubmit)(event_);
        },
        [handleSubmit, onSubmit],
    );

    useEffect(() => {
        return () => {
            URL.revokeObjectURL(photoURL);
        };
    }, [photoURL]);

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

                <FormControl className={styles.formControl}>
                    <FormLabel className={styles.label}>
                        <Typography variant="label">
                            Upload a new photo
                        </Typography>
                    </FormLabel>

                    <Controller
                        name="photo"
                        control={control}
                        render={({ field }): JSX.Element => (
                            <input
                                type="file"
                                accept={ACCEPTED_PHOTO_TYPES.join(',')}
                                ref={uploadPhotoReference}
                                hidden
                                onChange={(
                                    event: React.ChangeEvent<HTMLInputElement>,
                                ): void => {
                                    if (!event.target.files) {
                                        return;
                                    }
                                    const [file] = [...event.target.files];
                                    if (file.size <= MAX_FILE_SIZE.bytes) {
                                        field.onChange(file);
                                        setPhotoURL(URL.createObjectURL(file));
                                    } else {
                                        setError('photo', {
                                            message: `Please upload a picture smaller than ${MAX_FILE_SIZE.mb} MB.`,
                                            type: 'fileSize',
                                        });
                                    }
                                }}
                            />
                        )}
                    />
                    <Button
                        variant="outlined"
                        component="span"
                        label="Choose photo"
                        className={getValidClassNames(
                            styles.uploadPhotoBtn,
                            errors.photo?.message ? styles.btnError : '',
                        )}
                        onClick={(): void => {
                            uploadPhotoReference.current?.click();
                        }}
                    />
                    <Typography
                        variant="caption"
                        color="error"
                        className={styles.photoError}
                    >
                        {errors.photo?.type === 'fileSize' &&
                            errors.photo.message}
                    </Typography>
                </FormControl>
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

            <FormControl className={styles.formControl}>
                <FormLabel className={styles.label} required>
                    <Typography variant={'label'}>CV</Typography>
                </FormLabel>

                <Controller
                    name="cv"
                    control={control}
                    render={({ field }): JSX.Element => (
                        <input
                            type="file"
                            accept={ACCEPTED_CV_TYPES.join(',')}
                            hidden
                            ref={uploadCVReference}
                            onChange={(
                                event: React.ChangeEvent<HTMLInputElement>,
                            ): void => {
                                if (!event.target.files) {
                                    return;
                                }
                                const [file] = [...event.target.files];
                                if (file.size <= MAX_FILE_SIZE.bytes) {
                                    field.onChange(file);
                                } else {
                                    setError('cv', {
                                        message: `Please upload a CV smaller than ${MAX_FILE_SIZE.mb} MB.`,
                                        type: 'fileSize',
                                    });
                                }
                            }}
                        />
                    )}
                />

                <Button
                    variant="outlined"
                    color="primary"
                    component="span"
                    label="Choose file"
                    className={getValidClassNames(
                        styles.uploadCVBtn,
                        errors.cv?.message ? styles.btnError : '',
                    )}
                    startIcon={<PlusIcon />}
                    onClick={(): void => {
                        uploadCVReference.current?.click();
                    }}
                />

                <Typography variant="caption" color="error">
                    {errors.cv?.type === 'fileSize' && errors.cv.message}
                </Typography>
                <Typography variant="caption">
                    {watch('cv') ? `Attached file: ${watch('cv')?.name}` : ''}
                </Typography>

                <Typography variant="caption" className={styles.info}>
                    Job search is anonymous. This information will be seen only
                    in case you share it.
                </Typography>
            </FormControl>

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
