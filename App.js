import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { Platform, StatusBar, StyleSheet, View, SafeAreaView } from 'react-native';
import {getEvent, EventList, getQuotes, getTrivia, pastEvents, loadMoreEvents, getVideos} from './components/firebaseAuth';
import { AppLoading,SplashScreen } from 'expo';

import Week from './screens/Week';
import Offline from './screens/Offline';


import useCachedResources from './hooks/useCachedResources';
import BottomTabNavigator from './navigation/BottomTabNavigator';
import LinkingConfiguration from './navigation/LinkingConfiguration';

import { useFonts } from '@use-expo/font';
import Colors from './constants/Colors';


const Stack = createStackNavigator();

export default function App(props) {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);
  var routeName = 'Root';

  let [fontsLoaded] = useFonts({
    'textFont-regular': require('./assets/fonts/Nunito-Regular.ttf'),
    'textFont-bold': require('./assets/fonts/Nunito-Bold.ttf'),
    'textFont-italic': require('./assets/fonts/Nunito-Italic.ttf'),
    'textFont-semiBold': require('./assets/fonts/Nunito-SemiBold.ttf'),

    'textFont-bolditalic': require('./assets/fonts/Nunito-BoldItalic.ttf'),



    "titleFont": require('./assets/fonts/PatuaOne-Regular.ttf'),
    'titleFont-regular': require('./assets/fonts/kadwa-regular.ttf'),
  });

  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHide();
          await loadMoreEvents();
          await getQuotes();
          await getTrivia();
          await pastEvents();


      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
        routeName = 'Offline';
      } finally {
        setLoadingComplete(true);
        SplashScreen.hide();
      }
    }
    loadResourcesAndDataAsync();
  }, []);


  if (!fontsLoaded) {
    return <AppLoading />;
  } 
  else {
    if (!isLoadingComplete && !props.skipLoadingScreen) {
      return <AppLoading />;
    } else {
      if(EventList.length <= 1) routeName == 'Offline';
      return (
        <SafeAreaView style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle="light-content" backgroundColor={Colors.header}/>}
          <NavigationContainer linking={LinkingConfiguration}>
            <Stack.Navigator mode='modal' initialRouteName = {routeName}>
              <Stack.Screen name="Root" component={BottomTabNavigator} />
              <Stack.Screen name="Week" component={Week} options={{headerShown: false}}/>
              <Stack.Screen name="Offline" component={Offline} options={{headerShown: false}}/>


            </Stack.Navigator>
          </NavigationContainer>
        </SafeAreaView>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.header,
  },
});
