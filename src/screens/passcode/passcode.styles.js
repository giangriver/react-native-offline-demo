import { Dimensions, StyleSheet } from 'react-native';

const w = Dimensions.get('screen').width;
const h = Dimensions.get('screen').height;

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e6ffff',
        justifyContent: 'center',
        alignItems: "center"
    },
    inputText: {
        alignSelf: 'center',
        width: w * 0.7,
        marginTop: 4,
    },
    title:{
        fontWeight:'bold',
        fontSize: 30
    },
    button: {
        width: w*0.7,
        height: 40,
        marginTop:10,
        backgroundColor: "yellow",
        justifyContent:'center',
        alignItems:'center'
    }
})