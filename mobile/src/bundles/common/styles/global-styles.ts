import { type FlexAlignType, type FlexStyle, StyleSheet } from 'react-native';

import { AlignmentValues } from '~/bundles/common/enums/enums';

const globalStyles = StyleSheet.create({
    defaultMarginVertical: {
        marginVertical: 20,
    },
    defaultMarginHorizontal: {
        marginHorizontal: 20,
    },
    defaultMarginTop: {
        marginTop: 20,
    },
    defaultScreenMargin: {
        margin: 20,
    },
    defaultPaddingVertical: {
        paddingVertical: 20,
    },
    defaultPaddingHorizontal: {
        paddingHorizontal: 20,
    },
    defaultScreenPadding: {
        padding: 20,
    },
    flex1: {
        flex: 1,
    },
    width100: {
        width: '100%',
    },
    height100: {
        height: '100%',
    },
    flexDirectionColumn: {
        flexDirection: 'column' as FlexStyle['flexDirection'],
    },
    flexDirectionRow: {
        flexDirection: 'row' as FlexStyle['flexDirection'],
    },
    justifyContentCenter: {
        justifyContent: AlignmentValues.CENTER as FlexStyle['justifyContent'],
    },
    justifyContentFlexStart: {
        justifyContent:
            AlignmentValues.FLEX_START as FlexStyle['justifyContent'],
    },
    justifyContentFlexEnd: {
        justifyContent: AlignmentValues.FLEX_END as FlexStyle['justifyContent'],
    },
    justifyContentSpaceBetween: {
        justifyContent:
            AlignmentValues.SPACE_BETWEEN as FlexStyle['justifyContent'],
    },
    alignItemsCenter: {
        alignItems: AlignmentValues.CENTER as FlexAlignType,
    },
    alignItemsFlexStart: {
        alignItems: AlignmentValues.FLEX_START as FlexAlignType,
    },
    alignItemsFlexEnd: {
        alignItems: AlignmentValues.FLEX_END as FlexAlignType,
    },
    alignItemsStretch: {
        alignItems: AlignmentValues.STRETCH as FlexAlignType,
    },
    alignSelfCenter: {
        alignSelf: AlignmentValues.CENTER as FlexAlignType,
    },
    alignSelfFlexStart: {
        alignSelf: AlignmentValues.FLEX_START as FlexAlignType,
    },
    alignSelfFlexEnd: {
        alignSelf: AlignmentValues.FLEX_END as FlexAlignType,
    },
    alignSelfStretch: {
        alignSelf: AlignmentValues.STRETCH as FlexAlignType,
    },
    defaultBorderRadius: {
        borderRadius: 9,
    },
    defaultBorderTopRadius: {
        borderTopRightRadius: 9,
        borderTopLeftRadius: 9,
    },
});

export { globalStyles };
