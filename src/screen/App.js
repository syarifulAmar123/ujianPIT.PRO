import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashScreen from './splashScreen/SplashScreen';
import Login from './login/Login';
import Home from './home/Home';
import TambahDusun from './tambahDusun/TambahDusun';

const App = () => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Dusun" component={TambahDusun} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
