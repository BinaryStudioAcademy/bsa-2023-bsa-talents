import { StyleSheet } from 'react-native';

import { FLEX } from './flex';
import { MARGINS } from './margins';
import { PADDINGS } from './paddings';
import { SIZES } from './sizes';

const globalStyles = StyleSheet.create({
    ...FLEX,
    ...MARGINS,
    ...PADDINGS,
    ...SIZES,
});

export { globalStyles };
