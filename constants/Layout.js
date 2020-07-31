import { Dimensions } from 'react-native';
import Colors from './Colors';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default {
  window: {
    width,
    height,
  },
  isSmallDevice: width < 375,
  content:{
    height: 420,
    width: 360
  },
  headerScreenOptions:{headerStyle: {height: 60, backgroundColor: Colors.header, borderBottomWidth: 0}, headerTintColor: "white", headerBackTitleVisible:false, headerTitleStyle: {
    fontFamily: 'titleFont-regular',
    fontSize: 20,
    textAlign: 'center'
  }}
};
