import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {View, Text, Image, StatusBar} from 'react-native';

const SplashScreen = () => {
  const navigation = useNavigation();
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('Login');
    }, 5000);
  }, []);
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#hsl(0, 0%, 46%)',
      }}>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={'#hsl(0, 0%, 46%)'}
      />
      <Image
        source={require('../../assets/Sisambi.png')}
        style={{width: 150, height: 150}}
      />
      <Text
        style={{
          color: '#2b508b',
          fontSize: 35,
          fontWeight: 'bold',
          fontFamily: 'Roboto-Italic',
        }}>
        Disambi
      </Text>
    </View>
  );
};

export default SplashScreen;
