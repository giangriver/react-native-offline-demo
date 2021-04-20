import {Dimensions, StyleSheet} from 'react-native';

const w = Dimensions.get('screen').width;
const h = Dimensions.get('screen').height;

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  toolbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 16,
    marginHorizontal: 8,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
  },
  body: {
    marginVertical: 16,
    marginHorizontal: 8,
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    marginBottom: 16,
  },
  input: {
    height: 45,
    borderRadius: 12,
    backgroundColor: '#DCDCDC',
    width: '100%',
    paddingHorizontal: 16,
    marginVertical: 8,
    fontSize: 18,
  },
  modalContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBody: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
  },
  buttonOption: {
    backgroundColor: '#DCDCDC',
    padding: 8,
    marginVertical: 4,
  },
});
