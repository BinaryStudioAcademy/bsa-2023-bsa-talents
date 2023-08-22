import { Color, FontFamily, TextCategory } from '~/bundles/common/enums/enums';

const FONTS = {
    [TextCategory.H1]: {
        fontFamily: FontFamily.INTER_700,
        fontSize: 42,
        color: Color.TITLE,
    },
    [TextCategory.H2]: {
        fontFamily: FontFamily.INTER_700,
        fontSize: 28,
        color: Color.TITLE,
    },
    [TextCategory.H3]: {
        fontFamily: FontFamily.INTER_500,
        fontSize: 26,
        color: Color.TITLE,
    },
    [TextCategory.H4]: {
        fontFamily: FontFamily.INTER_500,
        fontSize: 24,
        color: Color.TITLE,
    },
    [TextCategory.H5]: {
        fontFamily: FontFamily.INTER_500,
        fontSize: 18,
        color: Color.TITLE,
    },
    [TextCategory.H6]: {
        fontFamily: FontFamily.INTER_400,
        fontSize: 16,
        color: Color.TITLE,
    },
    [TextCategory.MENU]: {
        fontFamily: FontFamily.INTER_400,
        fontSize: 18,
        color: Color.PRIMARY,
    },
    [TextCategory.BODY1]: {
        fontFamily: FontFamily.INTER_400,
        fontSize: 14,
        color: Color.PRIMARY,
    },
    [TextCategory.BUTTON]: {
        fontFamily: FontFamily.INTER_400,
        fontSize: 16,
        color: Color.PRIMARY,
    },
    [TextCategory.CAPTION]: {
        fontFamily: FontFamily.INTER_400,
        fontSize: 12,
        color: Color.TEXTDARK,
    },
    [TextCategory.INPUT]: {
        fontFamily: FontFamily.INTER_400,
        fontSize: 13,
        color: Color.PRIMARY,
    },
    [TextCategory.LABEL]: {
        fontFamily: FontFamily.INTER_400,
        fontSize: 13,
        color: Color.TITLE,
    },
};

export { FONTS };
