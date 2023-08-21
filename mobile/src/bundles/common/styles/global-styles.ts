import { StyleSheet } from 'react-native';

import { flex } from './flex';
import { margins } from './margins';
import { paddings } from './paddings';
import { sizes } from './sizes';

const globalStyles = StyleSheet.create({
    ...flex,
    ...margins,
    ...paddings,
    ...sizes,
});

export { globalStyles };
