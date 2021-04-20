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
        fontSize:25,
    },
    title:{
        fontWeight:'bold',
        fontSize: 30,
        color: '#00b3b3',
    },
    button: {
        width: w*0.7,
        height: 40,
        marginTop:20,
        backgroundColor: "#00b3b3",
        justifyContent:'center',
        alignItems:'center'
    },
    textButton: {
        fontWeight:'bold',
        color: 'white',
    }

})