import { StyleSheet } from '~/bundles/common/styles/styles';

import { FLEX } from './flex';
import { FONTS } from './fonts';
import { MARGINS } from './margins';
import { PADDINGS } from './paddings';
import { SIZES } from './sizes';

const globalStyles = StyleSheet.create({
    ...FLEX,
    ...FONTS,
    ...MARGINS,
    ...PADDINGS,
    ...SIZES,
});

export { globalStyles };
