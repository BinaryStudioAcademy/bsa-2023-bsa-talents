import React from 'react';

import { logout } from '~/bundles/auth/store/actions';
import { Button, Text, View } from '~/bundles/common/components/components';
import { TextCategory } from '~/bundles/common/enums/enums';
import { useAppDispatch } from '~/bundles/common/hooks/hooks';
import { globalStyles } from '~/bundles/common/styles/styles';

import { styles } from './styles';

type Properties = {
    numberOfUsers?: number;
};

const CandidatesHeader: React.FC<Properties> = ({ numberOfUsers }) => {
    const dispatch = useAppDispatch();
    const handleLogout = (): void => {
        void dispatch(logout());
    };

    return (
        <View
            style={[
                globalStyles.p25,
                globalStyles.pr15,
                globalStyles.flexDirectionRow,
                globalStyles.justifyContentSpaceBetween,
                globalStyles.alignItemsCenter,
                styles.container,
            ]}
        >
            <View
                style={[
                    globalStyles.flexDirectionRow,
                    globalStyles.alignItemsCenter,
                ]}
            >
                <Text category={TextCategory.H3}>Candidates</Text>
                {!!numberOfUsers && (
                    <Text
                        category={TextCategory.LABEL}
                        style={[
                            styles.talentsNumber,
                            globalStyles.borderRadius10,
                            globalStyles.alignSelfCenter,
                            globalStyles.ph10,
                            globalStyles.mt5,
                            globalStyles.ml5,
                        ]}
                    >
                        {numberOfUsers}
                    </Text>
                )}
            </View>
            <Button
                label="Logout"
                style={[globalStyles.ml5, globalStyles.ph10, globalStyles.pv5]}
                onPress={handleLogout}
            />
        </View>
    );
};

export { CandidatesHeader };
