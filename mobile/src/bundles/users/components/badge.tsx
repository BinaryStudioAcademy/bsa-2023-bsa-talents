import React from 'react';
import { Icon } from 'react-native-vector-icons/Icon';

import { Text, View } from '~/bundles/common/components/components';

const Badge: React.FC = () => {
    return (
        <View>
            <View>
                <Icon name="rocket" size={30} color="#900" />
            </View>
            <View>
                <Text>4.2/5</Text>
                <Text>Your average project score</Text>
            </View>
        </View>
    );
};

export { Badge };
