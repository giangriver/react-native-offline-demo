import {Dimensions, StyleSheet} from 'react-native';

const w = Dimensions.get('screen').width;
const h = Dimensions.get('screen').height;

export default StyleSheet.create({
  container: {
    width: w * 1,
    height: h * 1 - h * 0.112,
    backgroundColor: '#e6ffff',
  },
  headerContainer: {
    width: w * 1,
    height: h * 0.45,
  },
  headerImg: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconHead: {
    width: 250,
    height: 250,
  },
  txtWelcome: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#00b3b3',
    marginBottom: 20,
  },
  txtLogin: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
    color: '#00b3b3',
  },
  txtSignIn: {
    textAlign: 'center',
    fontSize: 14,
    color: 'gray',
    marginVertical: 5,
  },
  inputText: {
    alignSelf: 'center',
    width: w * 0.8,
    marginTop: 4,
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
  footerContainer: {
    alignSelf: 'center',
    marginTop: 10
  },
  txtSignUp: {
    color: '#00b3b3',
    fontWeight: 'bold'
  }
});
