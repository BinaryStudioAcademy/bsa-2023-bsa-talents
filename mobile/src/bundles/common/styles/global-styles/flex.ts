import { AlignmentValue } from '~/bundles/common/enums/enums';
import {
    type FlexAlignType,
    type FlexStyle,
} from '~/bundles/common/types/types';

const FLEX = {
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
        justifyContent: AlignmentValue.CENTER as FlexStyle['justifyContent'],
    },
    justifyContentFlexStart: {
        justifyContent:
            AlignmentValue.FLEX_START as FlexStyle['justifyContent'],
    },
    justifyContentFlexEnd: {
        justifyContent: AlignmentValue.FLEX_END as FlexStyle['justifyContent'],
    },
    justifyContentSpaceBetween: {
        justifyContent:
            AlignmentValue.SPACE_BETWEEN as FlexStyle['justifyContent'],
    },
    justifyContentSpaceAround: {
        justifyContent:
            AlignmentValue.SPACE_AROUND as FlexStyle['justifyContent'],
    },
    justifyContentSpaceEvenly: {
        justifyContent:
            AlignmentValue.SPACE_EVENLY as FlexStyle['justifyContent'],
    },
    alignItemsCenter: {
        alignItems: AlignmentValue.CENTER as FlexAlignType,
    },
    alignItemsFlexStart: {
        alignItems: AlignmentValue.FLEX_START as FlexAlignType,
    },
    alignItemsFlexEnd: {
        alignItems: AlignmentValue.FLEX_END as FlexAlignType,
    },
    alignItemsStretch: {
        alignItems: AlignmentValue.STRETCH as FlexAlignType,
    },
    alignSelfCenter: {
        alignSelf: AlignmentValue.CENTER as FlexAlignType,
    },
    alignSelfFlexStart: {
        alignSelf: AlignmentValue.FLEX_START as FlexAlignType,
    },
    alignSelfFlexEnd: {
        alignSelf: AlignmentValue.FLEX_END as FlexAlignType,
    },
    alignSelfStretch: {
        alignSelf: AlignmentValue.STRETCH as FlexAlignType,
    },
};

export { FLEX };
