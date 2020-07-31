import Layout from './Layout';
import Colors from './Colors';

export default {
    Media: {
        descBox: {
            width: Layout.window.width,
            flexShrink:1, 
            justifyContent:'center',
            alignItems:'center',
            paddingVertical: 10,
            justifyContent:'space-evenly'
        },
        text: {
            textAlign: 'center',
            fontFamily: 'textFont-regular',
            fontSize: 16,
            paddingHorizontal: 20,
            marginVertical: 4
        },
        visit: {
            textAlign: 'center',
            fontFamily: 'titleFont',
            fontSize: 22,
            paddingHorizontal: 20,
            color: Colors.header,
        },
        accountBox:{
            flexShrink:1,
        },

    }
}