import { Button, Grid } from '~/bundles/common/components/components.js';
import { getValidClassNames } from '~/bundles/common/helpers/helpers.js';
import { useCallback } from '~/bundles/common/hooks/hooks.js';

import styles from './styles.module.scss';

type AdminTab = {
    label: string;
    labelItemCount: number;
};
type Properties = {
    tabs: AdminTab[];
    activeTab: string;
    setTab: React.Dispatch<React.SetStateAction<string>>;
    className?: string;
};

const PanelTab: React.FC<Properties> = ({
    tabs,
    activeTab,
    setTab,
    className,
}) => {
    const handleTabChange = useCallback(
        (_event: React.MouseEvent<HTMLButtonElement>): void => {
            const button = _event.target as HTMLButtonElement;
            setTab(button.id);
        },
        [setTab],
    );

    return (
        <Grid className={getValidClassNames(className, styles.filters)}>
            {tabs.map((tab) => (
                <Button
                    key={tab.label}
                    id={tab.label}
                    onClick={handleTabChange}
                    label={`${tab.label} (${tab.labelItemCount})`}
                    className={getValidClassNames(
                        styles.button,
                        styles.tab,
                        activeTab.toLowerCase() === tab.label.toLowerCase() &&
                            styles.active,
                    )}
                />
            ))}
        </Grid>
    );
};

export { type AdminTab, PanelTab };
