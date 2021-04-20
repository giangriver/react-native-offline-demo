import {Dimensions, StyleSheet} from 'react-native';

const w = Dimensions.get('screen').width;
const h = Dimensions.get('screen').height;

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F4F8',
    marginHorizontal: 8,
  },
  headerContainer: {
    shadowColor: '#000',
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 5,
    shadowOffset: {width: 0, height: 2},
  },
  addBtn: {
    borderWidth: 0.5,
    borderColor: '#8E9195',
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    backgroundColor: '#fff',
    marginVertical: 16,
    marginHorizontal: 8,
  },
  myContactBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 8,
    marginBottom: 8,
  },
  myContactText: {
    fontWeight: '700',
    color: '#8E9195',
    fontSize: 18,
  },
  bodyContainer: {marginHorizontal: 8, flex: 1},
  groupName: {
    fontWeight: '700',
    color: '#606163',
    fontSize: 18,
  },
  itemContact: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  avatar: {
    width: 70,
    height: 70,
  },
  contactName: {
    paddingHorizontal: 16,
    fontSize: 17,
  },
});
