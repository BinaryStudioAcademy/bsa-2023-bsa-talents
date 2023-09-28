import { ManageSearch } from '@mui/icons-material';

import { type BodyRow } from '~/bundles/common/components/components.js';
import {
    Button,
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

import { ChatList } from '../../components/chat-list/chat-list.js';
import { CVAndContacts } from '../../components/components.js';
import {
    type AdminTab,
    PanelTab,
} from '../../components/panel-tabs/panel-tab.js';
import { FIRST_INDEX, PreviewTab } from '../../constants/constants.js';
import { HiringTableColumnNames } from '../../enums/enums.js';
import { talents } from '../../mock-data/mock-data.js';
import { type TabValues } from '../../types/types.js';
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

    const [selectedChatTab, setSelectedChatTab] = useState<TabValues>(
        PreviewTab.PROFILE,
    );
    const handleSelectTab = useCallback(
        (_event: React.MouseEvent<HTMLSpanElement>): void => {
            const button = _event.target as HTMLSpanElement;
            setSelectedChatTab(button.textContent as TabValues);
        },
        [],
    );

    const previewTabs = Object.values(PreviewTab).map((tab) => (
        <Button
            key={tab}
            onClick={handleSelectTab}
            className={getValidClassNames(
                styles.tab,
                selectedChatTab === tab ? 'selected' : '',
            )}
            disableRipple={true}
        >
            {tab}
        </Button>
    ));
    const hiringInfo = useAppSelector((state) => state.admin.hiringInfo);

    const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);

    const isScreenMoreMD = useMediaQuery(theme.breakpoints.up('md'));
    const isTogglePreviewAllowed = !isScreenMoreMD && isFilterOpen;

    const items = talents;
    const [selectedId, setSelectedId] = useState<string>(
        items[FIRST_INDEX]?.userId,
    );

    const selected = items.find((it) => it.userId === selectedId);
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
                    >
                        <ChatList
                            items={items}
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
                            {activeTab == 'Hirings' ? (
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
                            ) : (
                                <>
                                    <Grid className={styles.previewHeader}>
                                        <Typography
                                            variant="body1"
                                            className={styles.name}
                                        >
                                            {selected?.fullName ?? 'username'}
                                        </Typography>
                                    </Grid>
                                    <Grid className={styles.tabs}>
                                        {previewTabs}
                                    </Grid>
                                    <Grid item className={styles.previewInfo}>
                                        <CVAndContacts />
                                    </Grid>
                                </>
                            )}
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
