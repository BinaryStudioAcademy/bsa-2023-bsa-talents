import { Button, Grid } from '~/bundles/common/components/components.js';
import { useCallback, useState } from '~/bundles/common/hooks/hooks.js';

import { CandidateModal } from '../components/components.js';
import styles from './styles.module.scss';

// This page is for demonstrative purpose, fill with candidate page logic later
const Candidate: React.FC = () => {
    const [isModal1Open, setIsModal1Open] = useState(false);
    const [isModal2Open, setIsModal2Open] = useState(false);

    const closeModal1 = useCallback(() => {
        setIsModal1Open(false);
    }, []);
    const openModal1 = useCallback(() => {
        setIsModal1Open(true);
    }, []);
    const closeModal2 = useCallback(() => {
        setIsModal2Open(false);
    }, []);
    const openModal2 = useCallback(() => {
        setIsModal2Open(true);
    }, []);

    return (
        <Grid container className={styles.wrapper}>
            <CandidateModal isOpen={isModal1Open} onClose={closeModal1} />
            <Button label="Modal 1" onClick={openModal1} />
            <CandidateModal isOpen={isModal2Open} onClose={closeModal2} />
            <Button label="Modal 2" onClick={openModal2} />
        </Grid>
    );
};

export { Candidate };
