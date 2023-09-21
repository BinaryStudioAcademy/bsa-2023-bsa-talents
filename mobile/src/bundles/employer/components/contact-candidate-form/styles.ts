import { StyleSheet } from '~/bundles/common/styles/styles';

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
    },
    links: {
        gap: 5,
        position: 'relative',
    },
    linksBtn: {
        position: 'absolute',
        top: 5,
        right: 5,
    },
    linkBtn: {
        backgroundColor: 'transparent',
    },
});

export { styles };
