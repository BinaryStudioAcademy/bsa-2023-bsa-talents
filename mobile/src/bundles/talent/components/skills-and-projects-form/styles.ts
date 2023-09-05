import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        flexGrow: 1,
    },
    notConsiderContainer: {
        gap: 5,
        flexWrap: 'wrap',
        width: 200,
    },
    tagContainer: {
        gap: 5,
        flexWrap: 'wrap',
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
});

export { styles };
