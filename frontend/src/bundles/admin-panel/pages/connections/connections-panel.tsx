import { ManageSearch } from '@mui/icons-material';

import { type BodyRow } from '~/bundles/common/components/components.js';
import {
    Grid,
    IconButton,
    Table,
    Typography,
} from '~/bundles/common/components/components.js';
import { getValidClassNames } from '~/bundles/common/helpers/helpers.js';
import {
    useAppDispatch,
    useAppSelector,
    useCallback,
    useEffect,
    useMediaQuery,
    useState,
    useTheme,
} from '~/bundles/common/hooks/hooks.js';
import { actions as adminActions } from '~/bundles/hiring-info/store/hiring-info.js';

import {
    type AdminTab,
    PanelTab,
} from '../../components/panel-tabs/panel-tab.js';
import { HiringTableColumnNames } from '../../enums/enums.js';
import styles from './styles.module.scss';

const tabs = [
    //TODO: add here hiring info chats talent-company
    // {
    //     label: 'Chats',
    //     labelItemCount: 1,
    // },
    {
        label: 'Hirings',
        labelItemCount: 1,
    },
] as AdminTab[];

const AdminConnectionsPanel: React.FC = () => {
    const [activeTab, setActiveTab] = useState<string>('Hirings');
    const theme = useTheme();

    const dispatch = useAppDispatch();
    useEffect(() => {
        void dispatch(adminActions.getAllHiringInfo());
    }, [dispatch]);

    const hiringInfo = useAppSelector((state) => state.admin.hiringInfo);

    const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);

    const isScreenMoreMD = useMediaQuery(theme.breakpoints.up('md'));
    const isTogglePreviewAllowed = !isScreenMoreMD && isFilterOpen;

    const handleFilterShow = useCallback((): void => {
        setIsFilterOpen((previous) => !previous);
    }, []);

    useEffect(() => {
        if (isScreenMoreMD) {
            setIsFilterOpen(true);
        }
        if (activeTab == 'Hirings') {
            setIsFilterOpen(false);
        }
    }, [isScreenMoreMD, activeTab]);

    return (
        <Grid container className={styles.pageWrapper}>
            <Grid item className={styles.pageTitle}>
                <Typography className={styles.headerText} variant="h1">
                    Connections
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
                <PanelTab
                    tabs={tabs}
                    activeTab={activeTab}
                    setTab={setActiveTab}
                    className={styles.panelTabs}
                />
                <Grid className={styles.panel}>
                    <Grid
                        item
                        className={getValidClassNames(
                            styles.filterWrapper,
                            isFilterOpen ? '' : 'hidden',
                        )}
                    ></Grid>
                    {
                        <Grid
                            container
                            item
                            className={getValidClassNames(
                                styles.previewWrapper,
                                isTogglePreviewAllowed ? 'hidden' : '',
                            )}
                        >
                            <Grid
                                item
                                className={getValidClassNames(
                                    styles.previewInfo,
                                    styles.previewInfoTable,
                                )}
                            >
                                <Table
                                    headRow={HiringTableColumnNames}
                                    bodyRows={
                                        hiringInfo as unknown as BodyRow[]
                                    }
                                />
                            </Grid>
                            {/* TODO: hire approve from admin page
                             <Grid item className={styles.buttonGroup}>
                                <Button
                                    className={getValidClassNames(
                                        styles.button,
                                        styles.approveButton,
                                    )}
                                    label="Approve"
                                />
                            </Grid> */}
                        </Grid>
                    }
                </Grid>
            </Grid>
        </Grid>
    );
};

export { AdminConnectionsPanel };
