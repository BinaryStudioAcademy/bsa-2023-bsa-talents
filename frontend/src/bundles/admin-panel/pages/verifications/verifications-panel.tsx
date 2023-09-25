import { ManageSearch } from '@mui/icons-material';

import {
    Avatar,
    Button,
    Grid,
    IconButton,
    Typography,
} from '~/bundles/common/components/components.js';
import { getValidClassNames } from '~/bundles/common/helpers/helpers.js';
import {
    useCallback,
    useEffect,
    useMediaQuery,
    useState,
    useTheme,
} from '~/bundles/common/hooks/hooks.js';

import { VerificationList } from '../../components/components.js';
import { CVAndContacts } from '../../components/cv-and-contacts/cv-and-contacts.js';
import { FIRST_INDEX, PreviewTab } from '../../constants/constants.js';
import { employers, talents } from '../../mock-data/mock-data.js';
import { type FilterValues, type TabValues } from '../../types/types.js';
import styles from './styles.module.scss';

const AdminVerificationsPanel: React.FC = () => {
    const [filter, setFilter] = useState<FilterValues>('talents');
    const items = filter === 'talents' ? talents : employers;
    const theme = useTheme();

    const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);
    const [selectedId, setSelectedId] = useState<string>(
        items[FIRST_INDEX]?.userId,
    );
    const [selectedTab, setSelectedTab] = useState<TabValues>(
        PreviewTab.PROFILE,
    );

    const isScreenMoreMD = useMediaQuery(theme.breakpoints.up('md'));
    const isTogglePreviewAllowed = !isScreenMoreMD && isFilterOpen;

    // TODO: Change mock data to data from DB.
    const selected = items.find((it) => it.userId === selectedId);

    const handleSelectTab = useCallback(
        (_event: React.MouseEvent<HTMLSpanElement>): void => {
            const button = _event.target as HTMLSpanElement;
            setSelectedTab(button.textContent as TabValues);
        },
        [],
    );

    const previewTabs = Object.values(PreviewTab).map((tab) => (
        <Button
            key={tab}
            onClick={handleSelectTab}
            className={getValidClassNames(
                styles.tab,
                selectedTab === tab ? 'selected' : '',
            )}
            disableRipple={true}
        >
            {tab}
        </Button>
    ));

    const handleFilterShow = useCallback((): void => {
        setIsFilterOpen((previous) => !previous);
    }, []);

    useEffect(() => {
        if (isScreenMoreMD) {
            setIsFilterOpen(true);
        }
    }, [isScreenMoreMD]);

    return (
        <Grid container className={styles.pageWrapper}>
            <Grid item className={styles.pageTitle}>
                <Typography className={styles.headerText} variant="h1">
                    Verifications
                </Typography>
                <Grid item className={styles.mobileFilter} tabIndex={0}>
                    {!isScreenMoreMD && (
                        <IconButton onClick={handleFilterShow}>
                            <ManageSearch fontSize="large" />
                        </IconButton>
                    )}
                </Grid>
            </Grid>
            <Grid container item className={styles.pageContent}>
                <Grid
                    item
                    className={getValidClassNames(
                        styles.filterWrapper,
                        isFilterOpen ? '' : 'hidden',
                    )}
                >
                    <VerificationList
                        items={items}
                        filter={filter}
                        setFilter={setFilter}
                        selectedId={selectedId}
                        setSelectedId={setSelectedId}
                        isScreenMoreMd={isScreenMoreMD}
                        isFilterOpen={isFilterOpen}
                        setIsFilterOpen={setIsFilterOpen}
                    />
                </Grid>
                {
                    <Grid
                        container
                        item
                        className={getValidClassNames(
                            styles.previewWrapper,
                            isTogglePreviewAllowed ? 'hidden' : '',
                        )}
                    >
                        <Grid className={styles.previewHeader}>
                            <Avatar
                                className={styles.avatar}
                                src={selected?.avatar}
                            />
                            <Typography variant="body1" className={styles.name}>
                                {selected?.username ?? 'username'}
                            </Typography>
                        </Grid>
                        <Grid className={styles.tabs}>{previewTabs}</Grid>
                        <Grid item className={styles.previewInfo}>
                            <CVAndContacts />
                        </Grid>
                        <Grid item className={styles.buttonGroup}>
                            <Button
                                className={getValidClassNames(
                                    styles.button,
                                    styles.denyButton,
                                )}
                                label="Deny"
                                variant="outlined"
                            />
                            <Button
                                className={getValidClassNames(
                                    styles.button,
                                    styles.approveButton,
                                )}
                                label="Next Step"
                            />
                        </Grid>
                    </Grid>
                }
            </Grid>
        </Grid>
    );
};

export { AdminVerificationsPanel };
