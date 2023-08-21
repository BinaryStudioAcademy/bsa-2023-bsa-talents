import { type FlexAlignType, type FlexStyle, StyleSheet } from 'react-native';

const AlignmentValues = {
    CENTER: 'center',
    FLEX_START: 'flex-start',
    FLEX_END: 'flex-end',
    STRETCH: 'stretch',
    SPACE_BETWEEN: 'space-between',
    SPACE_AROUND: 'space-around',
    SPACE_EVENLY: 'space-evenly,',
} as const;

const flex = StyleSheet.create({
    flex1: {
        flex: 1,
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
    justifyContentSpaceAround: {
        justifyContent:
            AlignmentValues.SPACE_AROUND as FlexStyle['justifyContent'],
    },
    justifyContentSpaceEvenly: {
        justifyContent:
            AlignmentValues.SPACE_EVENLY as FlexStyle['justifyContent'],
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
});

export { flex };
