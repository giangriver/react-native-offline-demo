import {Dimensions, StyleSheet} from 'react-native';

const w = Dimensions.get('screen').width;
const h = Dimensions.get('screen').height;

export default StyleSheet.create({
  container: {
    width: w * 1,
    height: h * 0.9,
    backgroundColor: '#e6ffff',
  },
  headerImg: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconHead: {
    width: 100,
    height: 100,
  },
  home: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textHome: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#00b3b3'
  },
  textWelcome: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#808080'
  },
  btnLogin: {
    alignSelf: 'center',
    // width: 100,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#00cccc',
    marginTop: 20,
    borderRadius: 5,
  },
  txtSubmit: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold'
  },
});
